/* -*- Mode: C++; tab-width: 4; c-basic-offset: 4 -*- */

/* Parser for the Faust language */

%{

#include "tree.hh"
#include "xtended.hh"
#include "boxes.hh"
#include "prim2.hh"
#include "signals.hh"
#include "errormsg.hh"
#include "sourcereader.hh"
#include "doc.hh"
#include "ppbox.hh"

#include <string>
#include <list>

#define YYDEBUG 1
#define YYERROR_VERBOSE 1
#define YYMAXDEPTH	100000
	
using namespace std;

extern char* 		yytext;
extern const char* 	yyfilename;
extern int 			yylineno;
extern int 			yyerr;
extern Tree 		gResult;
extern bool         gStripDocSwitch;
extern bool         gLstDependenciesSwitch;
extern bool         gLstDistributedSwitch;
extern bool        	gLstMdocTagsSwitch;
	
extern map<Tree, set<Tree> > gMetaDataSet;
extern vector<Tree> gDocVector;


int yylex();

//----------------------------------------------------------
// unquote() : remove enclosing quotes and carriage return 
// characters from string. Returns a Tree 
//----------------------------------------------------------
char replaceCR(char c)
{
	return (c!='\n') ? c : ' ';
}

Tree unquote(char* str)
{
	//-----------copy unquoted filename-------------
	char buf[512];
	int j=0;

	if (str[0] == '"') {
		//it is a quoted string, we remove the quotes
		for (int i=1; j<511 && str[i];) {
			buf[j++] = replaceCR(str[i++]);
		}
		// remove last quote
		if (j>0) buf[j-1] = 0;
	} else {
		for (int i=0; j<511 && str[i];) {
			buf[j++] = replaceCR(str[i++]);
		}
	}
	buf[j] = 0;

	return tree(buf);
	//----------------------------------------------
}

%}


%union {
	CTree* 	exp;
	char* str;
	string* cppstr;
	bool b;
}

%start program

/* With local environment (lowest priority)*/
%left WITH

/* Block Diagram Algebra */
/*%left SEQ SPLIT MIX*/
%right SPLIT MIX
%right SEQ
%right PAR
%left REC

/* Primitive boxes */

%left LT LE EQ GT GE NE

%left ADD SUB OR
%left MUL DIV MOD AND XOR LSH RSH
%left POWOP
%left FDELAY
%left DELAY1
%left APPL DOT


%token MEM
%token PREFIX

%token INTCAST
%token FLOATCAST
%token FFUNCTION
%token FCONSTANT
%token FVARIABLE

%token BUTTON
%token CHECKBOX
%token VSLIDER
%token HSLIDER
%token NENTRY
%token VGROUP
%token HGROUP
%token TGROUP

%token HBARGRAPH
%token VBARGRAPH
%token ATTACH


%token ACOS
%token ASIN
%token ATAN
%token ATAN2
%token COS
%token SIN
%token TAN

%token EXP
%token LOG
%token LOG10
%token POWFUN
%token SQRT

%token ABS
%token MIN
%token MAX

%token FMOD
%token REMAINDER

%token FLOOR
%token CEIL
%token RINT



%token RDTBL
%token RWTBL

%token SELECT2
%token SELECT3

%token INT
%token FLOAT


%token LAMBDA
%token DOT

%token WIRE
%token CUT
%token ENDDEF
%token VIRG
%token LPAR
%token RPAR
%token LBRAQ
%token RBRAQ
%token LCROC
%token RCROC
%token WITH
%token DEF

%token IMPORT
%token COMPONENT
%token LIBRARY
%token ENVIRONMENT

%token IPAR
%token ISEQ
%token ISUM
%token IPROD

%token STRING
%token FSTRING
%token IDENT
%token EXTRA

%token DECLARE

%token CASE
%token ARROW


 /* Begin and End tags for documentations, equations and diagrams */
%token BDOC
%token EDOC
%token BEQN
%token EEQN
%token BDGM
%token EDGM
%token BLST
%token ELST
%token BMETADATA
%token EMETADATA
%token <cppstr> DOCCHAR
%token NOTICE
%token LISTING

%token LSTTRUE
%token LSTFALSE
%token LSTDEPENDENCIES
%token LSTMDOCTAGS
%token LSTDISTRIBUTED
%token LSTEQ
%token LSTQ


%type <exp> program

%type <exp> stmtlist
%type <exp> statement

%type <exp> deflist
%type <exp> definition

%type <exp> params

%type <exp> expression

%type <exp> defname
%type <exp> infixexp
%type <exp> primitive
%type <exp> argument
%type <exp> arglist

%type <exp> ident
%type <exp> name

%type <exp> ffunction
%type <exp> fconst
%type <exp> fvariable
%type <exp> signature
%type <exp> string
%type <exp> uqstring
%type <exp> fstring
%type <exp> type
%type <exp> typelist
%type <exp> fun

%type <exp> fpar
%type <exp> fseq
%type <exp> fsum
%type <exp> fprod

%type <exp> button
%type <exp> checkbox
%type <exp> vslider
%type <exp> hslider
%type <exp> nentry
%type <exp> vgroup
%type <exp> hgroup
%type <exp> tgroup

%type <exp> vbargraph
%type <exp> hbargraph

%type <exp> rule
%type <exp> rulelist

%type <exp> doc
%type <exp> docelem
%type <cppstr> doctxt
%type <exp> doceqn
%type <exp> docdgm
%type <exp> docntc
%type <exp> doclst
%type <exp> docmtd

%type <exp> lstattrlist
%type <exp> lstattrdef
%type <b> lstattrval





%% /* grammar rules and actions follow */

program         : stmtlist 						{ $$ = $1; gResult = formatDefinitions($$); }
				;

stmtlist        : /*empty*/                     { $$ = nil; }
				| stmtlist statement            { $$ = cons ($2,$1); }

deflist         : /*empty*/                     { $$ = nil; }
				| deflist definition            { $$ = cons ($2,$1); }
				;

statement       : IMPORT LPAR uqstring RPAR ENDDEF	   	{ $$ = importFile($3); }
				| DECLARE name string  ENDDEF		   	{ declareMetadata($2,$3); $$ = nil; }
				| definition						   	{ $$ = $1; }
				| BDOC doc EDOC						   	{ declareDoc($2); $$ = nil; /* cerr << "Yacc : doc : " << *$2 << endl; */ }
                ;

doc             : /* empty */						   	{ $$ = nil; }
				| doc docelem						   	{ $$ = cons ($2,$1); }
				;

docelem         : doctxt 							   	{ $$ = docTxt($1->c_str()); delete $1; }
				| doceqn 							   	{ $$ = docEqn($1); }
				| docdgm 							   	{ $$ = docDgm($1); }
				| docntc 							   	{ $$ = docNtc(); }
                | doclst 							   	{ $$ = docLst(); }
				| docmtd 							   	{ $$ = docMtd($1); }
				;

doctxt          : /* empty */				   		   	{ $$ = new string(); }
				| doctxt DOCCHAR					   	{ $$ = &($1->append(yytext)); }
				;

doceqn          : BEQN expression EEQN			   	   	{ $$ = $2; }
				;

docdgm          : BDGM expression EDGM		   	   		{ $$ = $2; }
				;

docntc          : NOTICE								{ }
				;

doclst          : BLST lstattrlist ELST					{ }
				;

lstattrlist		: /* empty */							{ }
				| lstattrlist lstattrdef				{ }
				;

lstattrdef		: LSTDEPENDENCIES LSTEQ LSTQ lstattrval LSTQ	{ gLstDependenciesSwitch = $4; }
				| LSTMDOCTAGS LSTEQ LSTQ lstattrval LSTQ		{ gStripDocSwitch = $4; gStripDocSwitch==true ? gStripDocSwitch=false : gStripDocSwitch=true; }
				| LSTDISTRIBUTED LSTEQ LSTQ lstattrval LSTQ		{ gLstDistributedSwitch = $4; }
				;

lstattrval		: LSTTRUE								{ $$ = true; }
				| LSTFALSE								{ $$ = false; }
				;

docmtd          : BMETADATA name EMETADATA				{ $$ = $2; }
				;

definition		: defname LPAR arglist RPAR DEF expression ENDDEF	{ $$ = cons($1,cons($3,$6)); }
				| defname DEF expression ENDDEF		   	{ $$ = cons($1,cons(nil,$3)); }
				| error ENDDEF				   		   	{ $$ = nil; yyerr++; }
				;

defname			: ident 								{ $$=$1; setDefProp($1, yyfilename, yylineno); }
				;

params			: ident					   				{ $$ = cons($1,nil); }
				| params PAR ident				   		{ $$ = cons($3,$1); }
                ;

expression		: expression WITH LBRAQ deflist RBRAQ	{ $$ = boxWithLocalDef($1,formatDefinitions($4)); }
				| expression PAR expression  			{ $$ = boxPar($1,$3); }
				| expression SEQ expression  			{ $$ = boxSeq($1,$3); }
				| expression SPLIT  expression 		    { $$ = boxSplit($1,$3); }
				| expression MIX expression 			{ $$ = boxMerge($1,$3); }
				| expression REC expression  			{ $$ = boxRec($1,$3); }
				| infixexp					            { $$ = $1; }
				;

infixexp		: infixexp ADD infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigAdd)); }
				| infixexp SUB infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigSub)); }
				| infixexp MUL infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigMul)); }
				| infixexp DIV infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigDiv)); }
                | infixexp MOD infixexp     { $$ = boxSeq(boxPar($1,$3),boxPrim2(sigRem)); }
                | infixexp POWOP infixexp   { $$ = boxSeq(boxPar($1,$3),gPowPrim->box()); }
                | infixexp FDELAY infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigFixDelay)); }
				| infixexp DELAY1  			{ $$ = boxSeq($1,boxPrim1(sigDelay1)); }
				| infixexp DOT ident  		{ $$ = boxAccess($1,$3); }

				| infixexp AND infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigAND)); }
				| infixexp OR infixexp 		{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigOR)); }
				| infixexp XOR infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigXOR)); }

				| infixexp LSH infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigLeftShift)); }
				| infixexp RSH infixexp 	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigRightShift)); }

				| infixexp LT infixexp  	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigLT)); }
				| infixexp LE infixexp  	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigLE)); }
				| infixexp GT infixexp  	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigGT)); }
				| infixexp GE infixexp  	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigGE)); }
				| infixexp EQ infixexp  	{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigEQ)); }
				| infixexp NE infixexp		{ $$ = boxSeq(boxPar($1,$3),boxPrim2(sigNE)); }

				| infixexp LPAR arglist RPAR 	%prec APPL	{ $$ = buildBoxAppl($1,$3); }
				| infixexp LCROC deflist RCROC	%prec APPL	{ $$ = boxModifLocalDef($1,formatDefinitions($3)); }
				
				| primitive						{ $$ = $1; }
				;

primitive		: INT   						{ $$ = boxInt(atoi(yytext)); }
				| FLOAT 						{ $$ = boxReal(atof(yytext)); }

				| ADD INT   					{ $$ = boxInt (atoi(yytext)); }
				| ADD FLOAT 					{ $$ = boxReal(atof(yytext)); }

				| SUB INT   					{ $$ = boxInt ( -atoi(yytext) ); }
				| SUB FLOAT 					{ $$ = boxReal( -atof(yytext) ); }

				| WIRE   						{ $$ = boxWire(); }
				| CUT   						{ $$ = boxCut(); }

				| MEM   						{ $$ = boxPrim1(sigDelay1); }
				| PREFIX   						{ $$ = boxPrim2(sigPrefix); }

				| INTCAST   					{ $$ = boxPrim1(sigIntCast); }
				| FLOATCAST   					{ $$ = boxPrim1(sigFloatCast); }

				| ADD							{ $$ = boxPrim2(sigAdd); }
				| SUB 							{ $$ = boxPrim2(sigSub); }
				| MUL  							{ $$ = boxPrim2(sigMul); }
				| DIV							{ $$ = boxPrim2(sigDiv); }
				| MOD							{ $$ = boxPrim2(sigRem); }
				| FDELAY						{ $$ = boxPrim2(sigFixDelay); }

				| AND							{ $$ = boxPrim2(sigAND); }
				| OR 							{ $$ = boxPrim2(sigOR); }
				| XOR  							{ $$ = boxPrim2(sigXOR); }

				| LSH							{ $$ = boxPrim2(sigLeftShift); }
				| RSH 							{ $$ = boxPrim2(sigRightShift); }

				| LT							{ $$ = boxPrim2(sigLT); }
				| LE							{ $$ = boxPrim2(sigLE); }
				| GT							{ $$ = boxPrim2(sigGT); }
				| GE							{ $$ = boxPrim2(sigGE); }
				| EQ							{ $$ = boxPrim2(sigEQ); }
				| NE							{ $$ = boxPrim2(sigNE); }

				| ATTACH						{ $$ = boxPrim2(sigAttach); }

				| ACOS							{ $$ = gAcosPrim->box(); }
				| ASIN							{ $$ = gAsinPrim->box(); }
				| ATAN							{ $$ = gAtanPrim->box(); }
				| ATAN2							{ $$ = gAtan2Prim->box(); }
				| COS							{ $$ = gCosPrim->box(); }
				| SIN							{ $$ = gSinPrim->box(); }
				| TAN							{ $$ = gTanPrim->box(); }

				| EXP							{ $$ = gExpPrim->box(); }
				| LOG							{ $$ = gLogPrim->box(); }
				| LOG10							{ $$ = gLog10Prim->box(); }
                | POWOP                         { $$ = gPowPrim->box(); }
                | POWFUN                        { $$ = gPowPrim->box(); }
				| SQRT							{ $$ = gSqrtPrim->box(); }

				| ABS							{ $$ = gAbsPrim->box(); }
				| MIN							{ $$ = gMinPrim->box(); }
				| MAX							{ $$ = gMaxPrim->box(); }

				| FMOD							{ $$ = gFmodPrim->box(); }
				| REMAINDER						{ $$ = gRemainderPrim->box(); }

				| FLOOR							{ $$ = gFloorPrim->box(); }
				| CEIL							{ $$ = gCeilPrim->box(); }
				| RINT							{ $$ = gRintPrim->box(); }


				| RDTBL 						{ $$ = boxPrim3(sigReadOnlyTable); }
				| RWTBL							{ $$ = boxPrim5(sigWriteReadTable); }

				| SELECT2 						{ $$ = boxPrim3(sigSelect2); }
				| SELECT3						{ $$ = boxPrim4(sigSelect3); }

				| ident 						{ $$ = $1; }
                | SUB ident                     { $$ = boxSeq(boxPar(boxInt(0),$2),boxPrim2(sigSub)); }

				| LPAR expression RPAR				{ $$ = $2; }
				| LAMBDA LPAR params RPAR DOT LPAR expression RPAR
												{ $$ = buildBoxAbstr($3,$7); }

				| CASE LBRAQ rulelist RBRAQ		{ $$ = boxCase(checkRulelist($3)); }
				
				| ffunction						{ $$ = boxFFun($1); }
                | fconst                        { $$ = $1; }
                | fvariable                     { $$ = $1; }
                | COMPONENT LPAR uqstring RPAR  { $$ = boxComponent($3); }
                | LIBRARY LPAR uqstring RPAR    { $$ = boxLibrary($3); }
                | ENVIRONMENT LBRAQ deflist RBRAQ { $$ = boxWithLocalDef(boxEnvironment(),formatDefinitions($3)); }

				| button						{ $$ = $1; }
				| checkbox						{ $$ = $1; }
				| vslider						{ $$ = $1; }
				| hslider						{ $$ = $1; }
				| nentry						{ $$ = $1; }
				| vgroup						{ $$ = $1; }
				| hgroup						{ $$ = $1; }
				| tgroup						{ $$ = $1; }
				| vbargraph						{ $$ = $1; }
				| hbargraph						{ $$ = $1; }

				| fpar							{ $$ = $1; }
				| fseq							{ $$ = $1; }
				| fsum							{ $$ = $1; }
				| fprod							{ $$ = $1; }
				;


ident			: IDENT							{ $$ = boxIdent(yytext); }
				;

name			: IDENT							{ $$ = tree(yytext); }
				;



arglist			: argument						{ $$ = cons($1,nil); }
				| arglist PAR argument			{ $$ = cons($3,$1); }
				;

argument		: argument SEQ argument  		{ $$ = boxSeq($1,$3); }
				| argument SPLIT argument 		{ $$ = boxSplit($1,$3); }
				| argument MIX argument 		{ $$ = boxMerge($1,$3); }
				| argument REC argument  		{ $$ = boxRec($1,$3); }
				| infixexp					{ $$ = $1; }
				;

string			: STRING						{ $$ = tree(yytext); }
				;

uqstring		: STRING						{ $$ = unquote(yytext); }
				;

fstring			: STRING						{ $$ = tree(yytext); }
				| FSTRING						{ $$ = tree(yytext); }
				;

/* description of iterative expressions */

fpar			: IPAR LPAR ident PAR argument PAR expression RPAR
												{ $$ = boxIPar($3,$5,$7); }
				;

fseq			: ISEQ LPAR ident PAR argument PAR expression RPAR
												{ $$ = boxISeq($3,$5,$7); }
				;

fsum			: ISUM LPAR ident PAR argument PAR expression RPAR
												{ $$ = boxISum($3,$5,$7); }
				;

fprod			: IPROD LPAR ident PAR argument PAR expression RPAR
												{ $$ = boxIProd($3,$5,$7); }
				;


/* description of foreign functions */

ffunction		: FFUNCTION LPAR signature PAR fstring PAR string RPAR
												{ $$ = ffunction($3,$5,$7); }
				;

fconst          : FCONSTANT LPAR type name PAR fstring RPAR
                                                { $$ = boxFConst($3,$4,$6); }

fvariable       : FVARIABLE LPAR type name PAR fstring RPAR
                                                { $$ = boxFVar($3,$4,$6); }
				;

/* Description of user interface building blocks */
button			: BUTTON LPAR uqstring RPAR		{ $$ = boxButton($3); }
				;

checkbox		: CHECKBOX LPAR uqstring RPAR		{ $$ = boxCheckbox($3); }
				;

vslider			: VSLIDER LPAR uqstring PAR argument PAR argument PAR argument PAR argument RPAR
												{ $$ = boxVSlider($3,$5,$7,$9,$11); }
				;
hslider			: HSLIDER LPAR uqstring PAR argument PAR argument PAR argument PAR argument RPAR
												{ $$ = boxHSlider($3,$5,$7,$9,$11); }
				;
nentry			: NENTRY LPAR uqstring PAR argument PAR argument PAR argument PAR argument RPAR
												{ $$ = boxNumEntry($3,$5,$7,$9,$11); }
				;
vgroup			: VGROUP LPAR uqstring PAR expression RPAR
												{ $$ = boxVGroup($3, $5); }
				;
hgroup			: HGROUP LPAR uqstring PAR expression RPAR
												{ $$ = boxHGroup($3, $5); }
				;
tgroup			: TGROUP LPAR uqstring PAR expression RPAR
												{ $$ = boxTGroup($3, $5); }
				;

vbargraph		: VBARGRAPH LPAR uqstring PAR argument PAR argument RPAR
												{ $$ = boxVBargraph($3,$5,$7); }
				;
hbargraph		: HBARGRAPH LPAR uqstring PAR argument PAR argument RPAR
												{ $$ = boxHBargraph($3,$5,$7); }
				;

/* Description of foreign functions */

signature		: type fun LPAR typelist RPAR	{ $$ = cons($1, cons($2, $4)); }
				| type fun LPAR RPAR			{ $$ = cons($1, cons($2, nil)); }
				;

fun				: IDENT							{ $$ = tree(yytext); }
				;

typelist		: type							{ $$ = cons($1,nil); }
				| typelist PAR type				{ $$ = cons($3,$1); }
                ;

rulelist		: rule							{ $$ = cons($1,nil); }
				| rulelist rule					{ $$ = cons($2,$1); }
				;

rule			: LPAR arglist RPAR ARROW expression ENDDEF
												{ $$ = cons($2,$5); }
				;

type			: INTCAST						{ $$ = tree(0); }
				| FLOATCAST						{ $$ = tree(1); }
				;

%%

