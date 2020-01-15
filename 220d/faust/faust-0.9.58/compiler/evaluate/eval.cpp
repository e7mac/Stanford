/************************************************************************
 ************************************************************************
    FAUST compiler
	Copyright (C) 2003-2004 GRAME, Centre National de Creation Musicale
    ---------------------------------------------------------------------
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 ************************************************************************
 ************************************************************************/
 #define TRACE

/**
 * \file eval.cpp
 * Implementation of the Block diagram evaluator.
 *
 * A strict lambda-calculus evaluator for block diagram expressions.
 *
 **/


#include "eval.hh"
#include <stdio.h>
#include "errormsg.hh"
#include "ppbox.hh"
#include "simplify.hh"
#include "propagate.hh"
#include "patternmatcher.hh"
#include "signals.hh"
#include "xtended.hh"
#include "loopDetector.hh"
#include "property.hh"
#include "names.hh"
#include "compatibility.hh"


#include <assert.h>
extern SourceReader	gReader;
extern int  gMaxNameSize;
extern bool	gSimpleNames;
extern bool gSimplifyDiagrams;
// History
// 23/05/2005 : New environment management


//-------------- prototypes ---------------------------------------------------------
static Tree 	a2sb(Tree exp);
static Tree 	eval (Tree exp, Tree visited, Tree localValEnv);
static Tree 	realeval (Tree exp, Tree visited, Tree localValEnv);
static Tree 	revEvalList (Tree lexp, Tree visited, Tree localValEnv);
static Tree 	applyList (Tree fun, Tree larg);
static Tree 	iteratePar (Tree var, int num, Tree body, Tree visited, Tree localValEnv);
static Tree 	iterateSeq (Tree id, int num, Tree body, Tree visited, Tree localValEnv);
static Tree 	iterateSum (Tree id, int num, Tree body, Tree visited, Tree localValEnv);
static Tree 	iterateProd (Tree id, int num, Tree body, Tree visited, Tree localValEnv);
static Tree 	larg2par (Tree larg);
static int 		eval2int (Tree exp, Tree visited, Tree localValEnv);
static double   eval2double (Tree exp, Tree visited, Tree localValEnv);
static const char * evalLabel (const char* l, Tree visited, Tree localValEnv);

static Tree		evalIdDef(Tree id, Tree visited, Tree env);



static Tree		evalCase(Tree rules, Tree env);
static Tree		evalRuleList(Tree rules, Tree env);
static Tree		evalRule(Tree rule, Tree env);
static Tree		evalPatternList(Tree patterns, Tree env);
static Tree		evalPattern(Tree pattern, Tree env);

static Tree 	patternSimplification (Tree pattern);
static bool 	isBoxNumeric (Tree in, Tree& out);

static Tree 	vec2list(const vector<Tree>& v);
static void 	list2vec(Tree l, vector<Tree>& v);
static Tree 	listn (int n, Tree e);

static Tree     boxSimplification(Tree box);

// Public Interface
//----------------------


/**
 * Eval "process" from a list of definitions.
 *
 * Strict evaluation of a block diagram expression by applying beta reduction.
 * @param eqlist a list of faust defintions forming the the global environment
 * @return the process block diagram in normal form
 */
Tree evalprocess (Tree eqlist)
{
    Tree b = a2sb(eval(boxIdent("process"), nil, pushMultiClosureDefs(eqlist, nil, nil)));

    if (gSimplifyDiagrams) {
        b = boxSimplification(b);
    }

    return b;
}


/* Eval a documentation expression. */

Tree evaldocexpr (Tree docexpr, Tree eqlist)
{
	return a2sb(eval(docexpr, nil, pushMultiClosureDefs(eqlist, nil, nil)));
}



// Private Implementation
//------------------------

/**
 * Transform unused (unapplied) closures into symbolic boxes
 *
 * @param exp the expression to transform
 * @return an expression where abstractions have been replaced by symbolic boxes
 */

property<Tree> gSymbolicBoxProperty;

static Tree real_a2sb(Tree exp);

static Tree a2sb(Tree exp)
{
    Tree    result;
    Tree    id;

    if (gSymbolicBoxProperty.get(exp, result)) {
        return result;
    }

	result = real_a2sb(exp);
	if (result != exp && getDefNameProperty(exp, id)) {
		setDefNameProperty(result, id);		// propagate definition name property when needed
	}
    gSymbolicBoxProperty.set(exp, result);
	return result;
}

static int	gBoxSlotNumber = 0;		///< counter for unique slot number

static Tree real_a2sb(Tree exp)
{
	Tree abstr, visited, unusedEnv, localValEnv, var, name, body;

	if (isClosure(exp, abstr, unusedEnv, visited, localValEnv)) {

		if (isBoxIdent(abstr)) {
			// special case introduced with access and components
			Tree result = a2sb(eval(abstr, visited, localValEnv));

			// propagate definition name property when needed
			if (getDefNameProperty(exp, name))	setDefNameProperty(result, name);
			return result;

		} else if (isBoxAbstr(abstr, var, body)) {
			// Here we have remaining abstraction that we will try to 
			// transform in a symbolic box by applying it to a slot

			Tree slot = boxSlot(++gBoxSlotNumber); 
			stringstream s; s << boxpp(var);
			setDefNameProperty(slot, s.str() ); // ajout YO
			
			// Apply the abstraction to the slot
			Tree result = boxSymbolic(slot, a2sb(eval(body, visited, pushValueDef(var, slot, localValEnv))));

			// propagate definition name property when needed
			if (getDefNameProperty(exp, name)) setDefNameProperty(result, name);
			return result;

        } else if (isBoxEnvironment(abstr)) {
            return abstr;
	
		} else {
			evalerror(yyfilename, -1, " a2sb : internal error : not an abstraction inside closure ", exp);
			exit(1);
		}
		
	} else if (isBoxPatternMatcher(exp)) {
		// Here we have remaining PM rules that we will try to 
		// transform in a symbolic box by applying it to a slot
		
		Tree slot = boxSlot(++gBoxSlotNumber); 			
		stringstream s; s << "PM" << gBoxSlotNumber;
		setDefNameProperty(slot, s.str() ); 
		
		// apply the PM rules to the slot and transfoms the result in a symbolic box
		Tree result = boxSymbolic(slot, a2sb(applyList(exp, cons(slot,nil))));

		// propagate definition name property when needed
		if (getDefNameProperty(exp, name)) setDefNameProperty(result, name);
		return result;

	} else {
		// it is a constructor : transform each branches
        unsigned int    ar = exp->arity();
		tvec            B(ar);
        bool            modified = false;
		for (unsigned int i = 0; i < ar; i++) {
            Tree b = exp->branch(i);
            Tree m = a2sb(b);
            B[i] = m;
            if (b != m) modified=true;
		}
        Tree r = (modified) ? CTree::make(exp->node(), B) : exp;
        return r;
	}
}

static bool autoName(Tree exp , Tree& id)
{
	stringstream s; s << boxpp(exp);
	id = tree(s.str().c_str());
	return true;
}

bool getArgName(Tree t, Tree& id)
{
	//return getDefNameProperty(t, id) || autoName(t, id) ;
	return autoName(t, id) ;
}



/**
 * Eval a block diagram expression.
 *
 * Wrap the realeval function in order to propagate the name property
 * @param exp the expression to evaluate
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return a block diagram in normal form
 */
static loopDetector LD(1024, 512);


static Node EVALPROPERTY(symbol("EvalProperty"));

/**
 * set the value of box in the environment env
 * @param box the block diagram we have evaluated
 * @param env the evaluation environment
 * @param value the evaluated block diagram
 */
void setEvalProperty(Tree box, Tree env, Tree value)
{
    setProperty(box, tree(EVALPROPERTY,env), value);
}


/**
 * retrieve the value of box in the environment env
 * @param box the expression we want to retrieve the value
 * @param env the lexical environment
 * @param value the returned value if any
 * @return true if a value already exist
 */
bool getEvalProperty(Tree box, Tree env, Tree& value)
{
	return getProperty(box, tree(EVALPROPERTY,env), value);
}


static Tree eval (Tree exp, Tree visited, Tree localValEnv)
{
	Tree	id;
	Tree 	result;
	
    if (!getEvalProperty(exp, localValEnv, result)) {
        LD.detect(cons(exp,localValEnv));
        //cerr << "ENTER eval("<< *exp << ") with env " << *localValEnv << endl;
		result = realeval(exp, visited, localValEnv);
		setEvalProperty(exp, localValEnv, result);
        //cerr << "EXIT eval(" << *exp << ") IS " << *result << " with env " << *localValEnv << endl;
		if (getDefNameProperty(exp, id)) {
			setDefNameProperty(result, id);		// propagate definition name property 
		}
	}
	return result;
}

/**
 * Eval a block diagram expression.
 *
 * Strict evaluation of a block diagram expression by applying beta reduction.
 * @param exp the expression to evaluate
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return a block diagram in normal form
 */

static Tree realeval (Tree exp, Tree visited, Tree localValEnv)
{
	//Tree 	def;
	Tree 	fun;
	Tree 	arg;
	Tree	var, num, body, ldef;
	Tree 	label;
	Tree	cur, lo, hi, step;
	Tree	e1, e2, exp2, notused, visited2, lenv2;
	Tree	rules;
	Tree	id;

	//cerr << "EVAL " << *exp << " (visited : " << *visited << ")" << endl;
    //cerr << "REALEVAL of " << *exp << endl;
	
	xtended* xt = (xtended*) getUserData(exp);


	// constants
	//-----------
	
	if ( 	xt || 
			isBoxInt(exp) || isBoxReal(exp) || 
			isBoxWire(exp) || isBoxCut(exp) ||
			isBoxPrim0(exp) || isBoxPrim1(exp) || 
			isBoxPrim2(exp) || isBoxPrim3(exp) || 
			isBoxPrim4(exp) || isBoxPrim5(exp) ||
			isBoxFFun(exp) || isBoxFConst(exp) || isBoxFVar(exp) ) {
		return exp;

	// block-diagram constructors
	//---------------------------
	
	} else if (	isBoxSeq(exp, e1, e2) ) {
		return boxSeq(eval(e1, visited, localValEnv), eval(e2, visited, localValEnv));

	} else if (	isBoxPar(exp, e1, e2) ) {
		return boxPar(eval(e1, visited, localValEnv), eval(e2, visited, localValEnv));

	} else if (	isBoxRec(exp, e1, e2) ) {
		return boxRec(eval(e1, visited, localValEnv), eval(e2, visited, localValEnv));

	} else if (	isBoxSplit(exp, e1, e2) ) {
		return boxSplit(eval(e1, visited, localValEnv), eval(e2, visited, localValEnv));

	} else if (	isBoxMerge(exp, e1, e2) ) {
		return boxMerge(eval(e1, visited, localValEnv), eval(e2, visited, localValEnv));
		
	// Modules
	//--------

    } else if (isBoxAccess(exp, body, var)) {
        Tree val = eval(body, visited, localValEnv);
        if (isClosure(val, exp2, notused, visited2, lenv2)) {
            // it is a closure, we have an environment to access
            return eval(closure(var,notused,visited2,lenv2), visited, localValEnv);
        } else {
            evalerror(getDefFileProp(exp), getDefLineProp(exp), "No environment to access ", exp);
            exit(1);
        }

//////////////////////en chantier////////////////////////////

    } else if (isBoxModifLocalDef(exp, body, ldef)) {
        Tree val = eval(body, visited, localValEnv);
        if (isClosure(val, exp2, notused, visited2, lenv2)) {
            // we rebuild the closure using a copy of the original environment
            // modified with some new definitions
            Tree lenv3 = copyEnvReplaceDefs(lenv2, ldef, visited2, localValEnv);
            return eval(closure(exp2,notused,visited2,lenv3), visited, localValEnv);
        } else {

            evalerror(getDefFileProp(exp), getDefLineProp(exp), "not a closure ", val);
            evalerror(getDefFileProp(exp), getDefLineProp(exp), "No environment to access ", exp);
            exit(1);
        }

///////////////////////////////////////////////////////////////////

    } else if (isBoxComponent(exp, label)) {
        string  fname   = tree2str(label);
        Tree    eqlst   = gReader.expandlist(gReader.getlist(fname));
        Tree    res     = closure(boxIdent("process"), nil, nil, pushMultiClosureDefs(eqlst, nil, nil));
        setDefNameProperty(res, label);
        //cerr << "component is " << boxpp(res) << endl;
        return res;

    } else if (isBoxLibrary(exp, label)) {
        string  fname   = tree2str(label);
        Tree    eqlst   = gReader.expandlist(gReader.getlist(fname));
        Tree    res     = closure(boxEnvironment(), nil, nil, pushMultiClosureDefs(eqlst, nil, nil));
        setDefNameProperty(res, label);
        //cerr << "component is " << boxpp(res) << endl;
        return res;


	// user interface elements
	//------------------------
	
	} else if (isBoxButton(exp, label)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		//cout << "button label : " << l1 << " become " << l2 << endl;
		return ((l1 == l2) ? exp : boxButton(tree(l2)));

	} else if (isBoxCheckbox(exp, label)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		//cout << "check box label : " << l1 << " become " << l2 << endl;
		return ((l1 == l2) ? exp : boxCheckbox(tree(l2)));

	} else if (isBoxVSlider(exp, label, cur, lo, hi, step)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return ( boxVSlider(tree(l2),
					tree(eval2double(cur, visited, localValEnv)),
					tree(eval2double(lo, visited, localValEnv)),
					tree(eval2double(hi, visited, localValEnv)),
					tree(eval2double(step, visited, localValEnv))));

	} else if (isBoxHSlider(exp, label, cur, lo, hi, step)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return ( boxHSlider(tree(l2),
					tree(eval2double(cur, visited, localValEnv)),
					tree(eval2double(lo, visited, localValEnv)),
					tree(eval2double(hi, visited, localValEnv)),
					tree(eval2double(step, visited, localValEnv))));

	} else if (isBoxNumEntry(exp, label, cur, lo, hi, step)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return (boxNumEntry(tree(l2),
					tree(eval2double(cur, visited, localValEnv)),
					tree(eval2double(lo, visited, localValEnv)),
					tree(eval2double(hi, visited, localValEnv)),
					tree(eval2double(step, visited, localValEnv))));

	} else if (isBoxVGroup(exp, label, arg)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return boxVGroup(tree(l2),	eval(arg, visited, localValEnv) );

	} else if (isBoxHGroup(exp, label, arg)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return boxHGroup(tree(l2),	eval(arg, visited, localValEnv) );

	} else if (isBoxTGroup(exp, label, arg)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return boxTGroup(tree(l2),	eval(arg, visited, localValEnv) );

	} else if (isBoxHBargraph(exp, label, lo, hi)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return boxHBargraph(tree(l2),
					tree(eval2double(lo, visited, localValEnv)),
					tree(eval2double(hi, visited, localValEnv)));

	} else if (isBoxVBargraph(exp, label, lo, hi)) {
		const char* l1 = tree2str(label);
		const char* l2= evalLabel(l1, visited, localValEnv);
		return boxVBargraph(tree(l2),
					tree(eval2double(lo, visited, localValEnv)),
					tree(eval2double(hi, visited, localValEnv)));

	// lambda calculus
	//----------------
		
	} else if (isBoxIdent(exp)) {
		return evalIdDef(exp, visited, localValEnv);

	} else if (isBoxWithLocalDef(exp, body, ldef)) {
		return eval(body, visited, pushMultiClosureDefs(ldef, visited, localValEnv));
	
	} else if (isBoxAppl(exp, fun, arg)) {
        return applyList( eval(fun, visited, localValEnv),
						  revEvalList(arg, visited, localValEnv) );

    } else if (isBoxAbstr(exp)) {
        // it is an abstraction : return a closure
        return closure(exp, nil, visited, localValEnv);

    } else if (isBoxEnvironment(exp)) {
        // environment : return also a closure
        return closure(exp, nil, visited, localValEnv);

	} else if (isClosure(exp, exp2, notused, visited2, lenv2)) {

        if (isBoxAbstr(exp2)) {
            // a 'real' closure
            return closure(exp2, nil, setUnion(visited,visited2), lenv2);
        } else if (isBoxEnvironment(exp2)) {
            // a 'real' closure
            return closure(exp2, nil, setUnion(visited,visited2), lenv2);
        } else {
			// it was a suspended evaluation
			return eval(exp2, setUnion(visited,visited2), lenv2);
		}

	// Algorithmic constructions
	//--------------------------
	
	} else if (isBoxIPar(exp, var, num, body)) {
		int n = eval2int(num, visited, localValEnv);
		return iteratePar(var, n, body, visited, localValEnv);

	} else if (isBoxISeq(exp, var, num, body)) {
		int n = eval2int(num, visited, localValEnv);
		return iterateSeq(var, n, body, visited, localValEnv);

	} else if (isBoxISum(exp, var, num, body)) {
		int n = eval2int(num, visited, localValEnv);
		return iterateSum(var, n, body, visited, localValEnv);

	} else if (isBoxIProd(exp, var, num, body)) {
		int n = eval2int(num, visited, localValEnv);
		return iterateProd(var, n, body, visited, localValEnv);
		
	} else if (isBoxSlot(exp)) 		{ 
		return exp; 
	
	} else if (isBoxSymbolic(exp)) 	{
	 
	 	return exp;
	

	// Pattern matching extension
	//---------------------------
	
	} else if (isBoxCase(exp, rules)) {
        return evalCase(rules, localValEnv);

	} else if (isBoxPatternVar(exp, id)) {
		return exp;
		//return evalIdDef(id, visited, localValEnv);

	} else if (isBoxPatternMatcher(exp)) {
		return exp;

	} else {
		cerr << "ERROR : EVAL don't intercept : " << *exp << endl;
		assert(false);
	}
}

/* Deconstruct a (BDA) op pattern (YO). */

static inline bool isBoxPatternOp(Tree box, Node& n, Tree& t1, Tree& t2)
{
    if (    isBoxPar(box, t1, t2) ||
            isBoxSeq(box, t1, t2) ||
            isBoxSplit(box, t1, t2) ||
            isBoxMerge(box, t1, t2) ||
            isBoxRec(box, t1, t2)    )
    {
        n = box->node();
        return true;
    } else {
        return false;
    }
}


Tree NUMERICPROPERTY = tree(symbol("NUMERICPROPERTY"));

void setNumericProperty(Tree t, Tree num)
{
	setProperty(t, NUMERICPROPERTY, num);
}

bool getNumericProperty(Tree t, Tree& num)
{
	return getProperty(t, NUMERICPROPERTY, num);
}

/**
 * Simplify a block-diagram pattern by computing its numerical sub-expressions
 * \param pattern an evaluated block-diagram
 * \return a simplified pattern
 * 
 */
/* uncomment for debugging output */
//#define DEBUG
Tree simplifyPattern (Tree value)
{
	Tree num;
	if (!getNumericProperty(value,num)) {
		if (!isBoxNumeric(value,num)) {
			num = value;
		}
		setNumericProperty(value,num);
	}
	return num;
}


static bool isBoxNumeric (Tree in, Tree& out)
{
    int 	numInputs, numOutputs;
    double 	x;
    int		i;
    Tree 	v;

    if (isBoxInt(in, &i) || isBoxReal(in, &x)) {
        out = in;
        return true;
    } else {
        v = a2sb(in);
        if ( getBoxType(v, &numInputs, &numOutputs) && (numInputs == 0) && (numOutputs == 1) ) {
            // potential numerical expression
            Tree lsignals = boxPropagateSig(nil, v , makeSigInputList(numInputs) );
            Tree res = simplify(hd(lsignals));
            if (isSigReal(res, &x)) 	{
            out = boxReal(x);
            return true;
            }
            if (isSigInt(res, &i))  	{
            out = boxInt(i);
            return true;
            }
        }
        return false;
    }
}

static Tree patternSimplification (Tree pattern)
{	
	
	Node 	n(0);
	Tree 	v, t1, t2;
	
	if (isBoxNumeric(pattern, v)) {
		return v;
	} else if (isBoxPatternOp(pattern, n, t1, t2)) {
		return tree(n, patternSimplification(t1), patternSimplification(t2));
	} else {
		return pattern;
	}
}



/**
 * Eval a block diagram to a double.
 *
 * Eval a block diagram that represent a double constant. This function first eval
 * a block diagram to its normal form, then check it represent a numerical value (a
 * block diagram of type : 0->1) then do a symbolic propagation and try to convert the
 * resulting signal to a double.
 * @param exp the expression to evaluate
 * @param globalDefEnv the global environment
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return a block diagram in normal form
 */
static double eval2double (Tree exp, Tree visited, Tree localValEnv)
{
    Tree diagram = a2sb(eval(exp, visited, localValEnv)); // pour getBoxType
	int numInputs, numOutputs;
	getBoxType(diagram, &numInputs, &numOutputs);
	if ( (numInputs > 0) || (numOutputs != 1) ) {
		evalerror (yyfilename, yylineno, "not a constant expression of type : (0->1)", exp);
		return 1;
	} else {
		Tree lsignals = boxPropagateSig(nil, diagram , makeSigInputList(numInputs) );
		Tree val = simplify(hd(lsignals));
		return tree2float(val);
	}
}


/**
 * Eval a block diagram to an int.
 *
 * Eval a block diagram that represent an integer constant. This function first eval
 * a block diagram to its normal form, then check it represent a numerical value (a
 * block diagram of type : 0->1) then do a symbolic propagation and try to convert the
 * resulting signal to an int.
 * @param exp the expression to evaluate
 * @param globalDefEnv the global environment
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return a block diagram in normal form
 */
static int eval2int (Tree exp, Tree visited, Tree localValEnv)
{
    Tree diagram = a2sb(eval(exp, visited, localValEnv));   // pour getBoxType()
	int numInputs, numOutputs;
	getBoxType(diagram, &numInputs, &numOutputs);
	if ( (numInputs > 0) || (numOutputs != 1) ) {
		evalerror (yyfilename, yylineno, "not a constant expression of type : (0->1)", exp);
		return 1;
	} else {
		Tree lsignals = boxPropagateSig(nil, diagram , makeSigInputList(numInputs) );
		Tree val = simplify(hd(lsignals));
		return tree2int(val);
	}
}

static bool isDigitChar(char c)
{
    return (c >= '0') & (c <= '9');
}

static bool isIdentChar(char c)
{
    return ((c >= 'a') & (c <= 'z')) || ((c >= 'A') & (c <= 'Z')) || ((c >= '0') & (c <= '9')) || (c == '_');
}

const char* Formats [] = {"%d", "%1d", "%2d", "%3d", "%4d"};

static char* writeIdentValue(char* dst, int format, const char* ident, Tree visited, Tree localValEnv)
{
	int n = eval2int(boxIdent(ident), visited, localValEnv);
    int i = min(4,max(format,0));
    
	return dst + sprintf(dst, Formats[i], n);
}

static const char * evalLabel (const char* label, Tree visited, Tree localValEnv)
{
	char 		res[2000];
	char 		ident[64];

	const char* src = &label[0];
	char*		dst = &res[0];
	char*		id  = &ident[0];

	bool		parametric = false;
	int 		state = 0; int format = 0;
	char		c;

	while ((c=*src++)) {
		if (state == 0) {
			// outside ident mode
			if (c == '%') {
				// look ahead for next char
				if (*src == '%') {
					*dst++ = *src++; 		// copy escape char and skip one char
				} else {
					state = 1;				// prepare ident mode
                    format = 0;
					parametric = true;
					id  = &ident[0];
				}
			} else {
				*dst++ = c;					// copy char
			}
		} else if (state == 1) {
            // read the format 
            if (isDigitChar(c)) {
                format = format*10 + (c-'0');
            } else {
                state = 2;
                --src; // unread !!!
            }

        } else {
            
			// within ident mode
			if (isIdentChar(c)) {
				*id++ = c;
			} else {
				*id = 0;
				dst = writeIdentValue(dst, format, ident, visited, localValEnv);
				state = 0;
				src -= 1;
			}
		}
	}

	if (state == 2) {
		*id = 0;
		dst = writeIdentValue(dst, format, ident, visited, localValEnv);
	}
	*dst = 0;
	return (parametric) ? strdup(res) : label;
}



/**
 * Iterate a parallel construction
 *
 * Iterate a parallel construction such that :
 * par(i,10,E) --> E(i<-0),(E(i<-1),...,E(i<-9))
 * @param id the formal parameter of the iteration
 * @param num the number of iterartions
 * @param body the body expression of the iteration
 * @param globalDefEnv the global environment
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return a block diagram in normal form
 */
static Tree iteratePar (Tree id, int num, Tree body, Tree visited, Tree localValEnv)
{
    assert (num>0);

    Tree res = eval(body, visited, pushValueDef(id, tree(num-1), localValEnv));
    for (int i = num-2; i >= 0; i--) {
        res = boxPar(eval(body, visited, pushValueDef(id, tree(i), localValEnv)), res);
    }

    return res;
}



/**
 * Iterate a sequential construction
 *
 * Iterate a sequential construction such that :
 * seq(i,10,E) --> E(i<-0):(E(i<-1):...:E(i<-9))
 * @param id the formal parameter of the iteration
 * @param num the number of iterartions
 * @param body the body expression of the iteration
 * @param globalDefEnv the global environment
 * @param visited list of visited definition to detect recursive definitions
 * @return a block diagram in normal form
 */
static Tree iterateSeq (Tree id, int num, Tree body, Tree visited, Tree localValEnv)
{
	assert (num>0);

    Tree res = eval(body, visited, pushValueDef(id, tree(num-1), localValEnv));
    for (int i = num-2; i >= 0; i--) {
        res = boxSeq(eval(body, visited, pushValueDef(id, tree(i), localValEnv)), res);
    }

	return res;
}



/**
 * Iterate an addition construction
 *
 * Iterate an addition construction such that :
 * par(i,10,E) --> E(i<-0)+E(i<-1)+...+E(i<-9)
 * @param id the formal parameter of the iteration
 * @param num the number of iterartions
 * @param body the body expression of the iteration
 * @param globalDefEnv the global environment
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return a block diagram in normal form
 */
static Tree iterateSum (Tree id, int num, Tree body, Tree visited, Tree localValEnv)
{
	assert (num>0);

	Tree res = eval(body, visited, pushValueDef(id, tree(0), localValEnv));

	for (int i = 1; i < num; i++) {
		res = boxSeq(boxPar(res, eval(body, visited, pushValueDef(id, tree(i), localValEnv))),boxPrim2(sigAdd)) ;
	}

	return res;
}



/**
 * Iterate a product construction
 *
 * Iterate a product construction such that :
 * par(i,10,E) --> E(i<-0)*E(i<-1)*...*E(i<-9)
 * @param id the formal parameter of the iteration
 * @param num the number of iterartions
 * @param body the body expression of the iteration
 * @param globalDefEnv the global environment
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return a block diagram in normal form
 */
static Tree iterateProd (Tree id, int num, Tree body, Tree visited, Tree localValEnv)
{
	assert (num>0);

	Tree res = eval(body, visited, pushValueDef(id, tree(0), localValEnv));

	for (int i = 1; i < num; i++) {
		res = boxSeq(boxPar(res, eval(body, visited, pushValueDef(id, tree(i), localValEnv))),boxPrim2(sigMul)) ;
	}

	return res;
}

/**
 * Compute the sum of outputs of a list of boxes. The sum is
 * valid if all the boxes have a valid boxType
 *
 * @param boxlist the list of boxes
 * @param outputs sum of outputs of the boxes
 * @return true if outputs is valid, false otherwise
 */
 #if 1
static bool boxlistOutputs(Tree boxlist, int* outputs)
{
    int ins, outs;

    *outputs = 0;
    while (!isNil(boxlist))
    {
        Tree b = a2sb(hd(boxlist)); // for getBoxType, suppose list of evaluated boxes
        if (getBoxType(b, &ins, &outs)) {
            *outputs += outs;
      	} else {
      		// arbitrary output arity set to 1
      		// when can't be determined
      		*outputs += 1;
      	}
        boxlist = tl(boxlist);
    }
    return isNil(boxlist);
}
#else
static bool boxlistOutputs(Tree boxlist, int* outputs)
{
    int ins, outs;

    *outputs = 0;
    while (!isNil(boxlist) && getBoxType(hd(boxlist), &ins, &outs)) {
            *outputs += outs;
            boxlist = tl(boxlist);
    }
    return isNil(boxlist);
}
#endif

/**
 * repeat n times a wire
 */
static Tree nwires(int n)
{
	Tree l = nil;
	while (n--) { l = cons(boxWire(), l); }
	return l;
}


/**
 * Apply a function to a list of arguments. 
 * Apply a function F to a list of arguments (a,b,c,...).
 * F can be either a closure over an abstraction, or a 
 * pattern matcher. If it is not the case then we have :
 * F(a,b,c,...) ==> (a,b,c,...):F
 *
 * @param fun the function to apply
 * @param larg the list of arguments
 * @return the resulting expression in normal form
 */
static Tree applyList (Tree fun, Tree larg)
{
	Tree abstr;
	Tree globalDefEnv;
	Tree visited;
	Tree localValEnv;
	Tree envList;
	Tree originalRules;
	Tree revParamList;

	Tree id;
	Tree body;
	
	Automaton*	automat;
	int			state;

	prim2	p2;

    //cerr << "applyList (" << *fun << ", " << *larg << ")" << endl;

	if (isNil(larg)) return fun;

	if (isBoxError(fun) || isBoxError(larg)) {
		return boxError();
	}

	if (isBoxPatternMatcher(fun, automat, state, envList, originalRules, revParamList)) {
		Tree 			result;
		int 			state2;
		vector<Tree>	envVect;
		
		list2vec(envList, envVect);
        //cerr << "applyList/apply_pattern_matcher(" << automat << "," << state << "," << *hd(larg) << ")" << endl;
		state2 = apply_pattern_matcher(automat, state, hd(larg), result, envVect);
        //cerr << "state2 = " << state2 << "; result = " << *result << endl;
		if (state2 >= 0 && isNil(result)) {
			// we need to continue the pattern matching
			return applyList(
						boxPatternMatcher(automat, state2, vec2list(envVect), originalRules, cons(hd(larg),revParamList)),
						tl(larg) );
		} else if (state2 < 0) {
			cerr << "ERROR : pattern matching failed, no rule of " << boxpp(boxCase(originalRules)) 
				 << " matches argument list " << boxpp(reverse(cons(hd(larg), revParamList))) << endl;
			exit(1);
		} else {
			// Pattern Matching was succesful
			// the result is a closure that we need to evaluate.
			if (isClosure(result, body, globalDefEnv, visited, localValEnv)) {
				// why ??? return simplifyPattern(eval(body, nil, localValEnv));
				//return eval(body, nil, localValEnv);
				return applyList(eval(body, nil, localValEnv), tl(larg));
			} else {
				cerr << "wrong result from pattern matching (not a closure) : " << boxpp(result) << endl;
				return boxError();
			}
		}			
	}
	if (!isClosure(fun, abstr, globalDefEnv, visited, localValEnv)) {
		// principle : f(a,b,c,...) ==> (a,b,c,...):f
         int ins, outs;
         
         // check arity of function
         Tree efun = a2sb(fun);
         //cerr << "TRACEPOINT 1 : " << boxpp(efun) << endl;
         if (!getBoxType(efun, &ins, &outs)) { // on laisse comme ca pour le moment
         	// we can't determine the input arity of the expression
         	// hope for the best
         	return boxSeq(larg2par(larg), fun);
         }
 
         // check arity of arg list
         if (!boxlistOutputs(larg,&outs)) {
         	// we don't know yet the output arity of larg. Therefore we can't
         	// do any arity checking nor add _ to reach the required number of arguments
            // cerr << "warning : can't infere the type of : " << boxpp(larg) << endl;
         	return boxSeq(larg2par(larg), fun);
         }
		
		if (outs > ins) {
			cerr << "too much arguments : " << outs << ", instead of : " << ins << endl;
            cerr << "when applying : " << boxpp(fun) << endl
                 << "           to : " << boxpp(larg) << endl;
			assert(false);
		}
		
        if (    (outs == 1)
            &&
                (  ( isBoxPrim2(fun, &p2) && (p2 != sigPrefix) )
                || ( getUserData(fun) && ((xtended*)getUserData(fun))->isSpecialInfix() ) ) ) {
            // special case : /(3) ==> _,3 : /
            Tree larg2 = concat(nwires(ins-outs), larg);
            return boxSeq(larg2par(larg2), fun);

        } else {

			Tree larg2 = concat(larg, nwires(ins-outs));
            return boxSeq(larg2par(larg2), fun);
        }
	}

    if (isBoxEnvironment(abstr)) {
        evalerrorbox(yyfilename, -1, "an environment can't be used as a function", fun);
        exit(1);
    }

    if (!isBoxAbstr(abstr, id, body)) {
        evalerror(yyfilename, -1, "(internal) not an abstraction inside closure", fun);
        exit(1);
    }

	// try to synthetise a  name from the function name and the argument name
	{
		Tree arg = eval(hd(larg), visited, localValEnv);
		Tree narg; if ( isBoxNumeric(arg,narg) ) { arg =  narg; } 
		Tree f = eval(body, visited, pushValueDef(id, arg, localValEnv));

		Tree	fname;
		if (getDefNameProperty(fun, fname)) {
			stringstream s; s << tree2str(fname); if (!gSimpleNames) s << "(" << boxpp(arg) << ")";
			setDefNameProperty(f, s.str());
		}
		return applyList(f, tl(larg));
	}
}



/**
 * Eval a list of expression in reverse order
 *
 * Eval a list of expressions returning the list of results in reverse order.
 *
 * @param lexp list of expressions to evaluate
 * @param globalDefEnv the global environment
 * @param visited list of visited definition to detect recursive definitions
 * @param localValEnv the local environment
 * @return list of evaluated expressions in reverse order
 */
static Tree revEvalList (Tree lexp, Tree visited, Tree localValEnv)
{
    Tree result = nil;
    //Tree lexp_orig = lexp;
    //cerr << "ENTER revEvalList(" << *lexp_orig << ", env:" << *localValEnv << ")" << endl;
    while (!isNil(lexp)) {
		result = cons(eval(hd(lexp), visited, localValEnv), result);
		lexp = tl(lexp);
	}

    //cerr << "EXIT revEvalList(" << *lexp_orig << ", env:" << *localValEnv << ") -> " << *result << endl;
	return result;
}



/**
 * Transform a list of expressions in a parallel construction
 *
 * @param larg list of expressions
 * @return parallel construction
 */
static Tree larg2par (Tree larg)
{
	if (isNil(larg)) {
		evalerror(yyfilename, -1, "empty list of arguments", larg);
		exit(1);
	}
	if (isNil(tl(larg))) {
		return hd(larg);
	}
	return boxPar(hd(larg), larg2par(tl(larg)));
}




/**
 * Search the environment for the definition of a symbol
 * ID and evaluate it. Detects recursive definitions using
 * a set of visited IDxENV. Associates the symbol as a definition name
 * property of the definition.
 * @param id the symbol ID t-o search
 * @param visited set of visited symbols (used for recursive definition detection)
 * @param lenv the environment where to search
 * @return the evaluated definition of ID
 */
static Tree evalIdDef(Tree id, Tree visited, Tree lenv)
{
	Tree def, name;

	// search the environment env for a definition of symbol id
	while (!isNil(lenv) && !getProperty(lenv, id, def)) {
		lenv = lenv->branch(0);
	}

	// check that the definition exists
	if (isNil(lenv)) {
        cerr << "undefined symbol " << *id << endl;
		evalerror(getDefFileProp(id), getDefLineProp(id), "undefined symbol ", id);
		exit(1);
	}

    //cerr << "Id definition is " << *def << endl;
	// check that it is not a recursive definition
	Tree p = cons(id,lenv);
	// set the definition name property
	if (!getDefNameProperty(def, name)) {
		// if the definition has no name use the identifier
		stringstream s; s << boxpp(id);
		//XXXXXX setDefNameProperty(def, s.str());
	}

	// return the evaluated definition
	return eval(def, addElement(p,visited), nil);
}


/**
 * Creates a list of n elements.
 * @param n number of elements
 * @param e element to be repeated
 * @return [e e e ...] n times
 */

static Tree listn (int n, Tree e)
{
	return (n<= 0) ? nil : cons(e, listn(n-1,e));
}

/**
 * A property to store the pattern matcher corresponding to a set of rules
 * in a specific environement
 */
 
static Node PMPROPERTYNODE(symbol("PMPROPERTY"));

static void setPMProperty(Tree t, Tree env, Tree pm)
{
	setProperty(t, tree(PMPROPERTYNODE, env), pm);
}

static bool getPMProperty(Tree t, Tree env, Tree& pm)
{
	return getProperty(t, tree(PMPROPERTYNODE, env), pm);
}

/**
 * Eval a case expression containing a list of pattern matching rules.
 * Creates a boxPatternMatcher containing a pm autamaton a state 
 * and a list of environments.
 * @param rules the list of rules
 * @param env the environment uused to evaluate the patterns and closure the rhs
 * @return a boxPatternMatcher ready to be applied
 */
 
static Tree	evalCase(Tree rules, Tree env)
{
	Tree pm;
	if (!getPMProperty(rules, env, pm)) {
		Automaton*	a = make_pattern_matcher(evalRuleList(rules, env));
        pm = boxPatternMatcher(a, 0, listn(len(rules), pushEnvBarrier(env)), rules, nil);
        setPMProperty(rules, env, pm);
	}
	return pm;
}		


/**
 * Evaluates each rule of the list
 */
static Tree	evalRuleList(Tree rules, Tree env)
{
    //cerr << "evalRuleList "<< *rules << " in " << *env << endl;
	if (isNil(rules)) return nil;
	else return cons(evalRule(hd(rules), env), evalRuleList(tl(rules), env));
}


/**
 * Evaluates the list of patterns and closure the rhs
 */
static Tree	evalRule(Tree rule, Tree env)
{
    //cerr << "evalRule "<< *rule << " in " << *env << endl;
	return cons(evalPatternList(left(rule), env), right(rule));
}


/**
 * Evaluates each pattern of the list
 */
static Tree	evalPatternList(Tree patterns, Tree env)
{
	if (isNil(patterns)) {
		return nil;
	} else {
		return cons(	evalPattern(hd(patterns), env), 
						evalPatternList(tl(patterns), env)  );
	}
}


/**
 * Evaluates a pattern and simplify it to numerical value 
 * if possible 
 */
static Tree	evalPattern(Tree pattern, Tree env)
{
    Tree p = eval(pattern, nil, env);
    return patternSimplification(p);
}


static void list2vec(Tree l, vector<Tree>& v)
{
	while (!isNil(l)) {
		v.push_back(hd(l));
		l = tl(l);
	}
}


static Tree vec2list(const vector<Tree>& v)
{
	Tree l = nil;
	int	 n = v.size();
	while (n--) { l = cons(v[n],l); }
	return l;
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////
// further simplification : replace bloc-diagrams that denote constant number by this number
/////////////////////////////////////////////////////////////////////////////////////////////////////////

static property<Tree> SimplifiedBoxProperty;
static Tree numericBoxSimplification(Tree box);
static Tree insideBoxSimplification (Tree box);

/**
 * boxSimplification(box) : simplify a block-diagram by replacing expressions
 * denoting a constant number by this number.
 */
Tree boxSimplification (Tree box)
{
    Tree    simplified;

    if (SimplifiedBoxProperty.get(box,simplified)) {

        return simplified;

    } else {

        simplified = numericBoxSimplification(box);

        // transferts name property if any
        Tree name; if (getDefNameProperty(box, name)) setDefNameProperty(simplified, name);

        // attach simplified expression as a property of original box
        SimplifiedBoxProperty.set(box,simplified);

        return simplified;
    }
}

/**
 * Try to do a numeric simplification of a block-diagram
 */
Tree numericBoxSimplification(Tree box)
{
    int     ins, outs;
    Tree    result;
    int     i;
    double  x;

    if ( ! getBoxType(box, &ins, &outs)) {
        cout << "ERROR in file " << __FILE__ << ':' << __LINE__ << ", Can't compute the box type of : " << *box << endl;
        exit(1);
    }

    if (ins==0 && outs==1) {
        // this box can potentially denote a number
        if (isBoxInt(box, &i) || isBoxReal(box, &x)) {
           result = box;
        } else {
            // propagate signals to discover if it simplifies to a number
            int     i;
            double  x;
            Tree    lsignals = boxPropagateSig(nil, box , makeSigInputList(0));
            Tree    s = simplify(hd(lsignals));

            if (isSigReal(s, &x)) 	{
                result = boxReal(x);
            } else if (isSigInt(s, &i))  	{
                result = boxInt(i);
            } else {
                result = insideBoxSimplification(box);
            }
        }
    } else {
        // this box can't denote a number
        result = insideBoxSimplification(box);
    }
    return result;
}

/**
 *  Simplify inside a block-diagram : S[A*B] => S[A]*S[B]
 */
Tree insideBoxSimplification (Tree box)
{
    int		i;
    double	r;
    prim0	p0;
    prim1	p1;
    prim2	p2;
    prim3	p3;
    prim4	p4;
    prim5	p5;

    Tree	t1, t2, ff, label, cur, min, max, step, type, name, file, slot, body;


    xtended* xt = (xtended*)getUserData(box);

    // Extended Primitives

    if (xt)	{
        return box;
    }

    // Numbers and Constants

    else if (isBoxInt(box, &i)) 	{
        return box;
    }
    else if (isBoxReal(box, &r)) 	{
        return box;
    }

    else if (isBoxFConst(box, type, name, file))    {
        return box;
    }

    else if (isBoxFVar(box, type, name, file))    {
        return box;
    }

    // Wire and Cut

    else if (isBoxCut(box)) 				{
        return box;
    }

    else if (isBoxWire(box)) 				{
        return box;
    }

    // Primitives

    else if (isBoxPrim0(box, &p0)) 			{
        return box;
    }

    else if (isBoxPrim1(box, &p1)) 			{
        return box;
    }

    else if (isBoxPrim2(box, &p2)) 				{
        return box;
    }

    else if (isBoxPrim3(box, &p3)) 				{
        return box;
    }

    else if (isBoxPrim4(box, &p4)) 				{
        return box;
    }

    else if (isBoxPrim5(box, &p5)) 				{
        return box;
    }

    else if (isBoxFFun(box, ff)) 				{
        return box;
    }

    // User Interface Widgets

    else if (isBoxButton(box, label)) 	{
        return box;
    }

    else if (isBoxCheckbox(box, label)) 	{
        return box;
    }

    else if (isBoxVSlider(box, label, cur, min, max, step)) 	{
        return box;
    }

    else if (isBoxHSlider(box, label, cur, min, max, step)) 	{
        return box;
    }

    else if (isBoxNumEntry(box, label, cur, min, max, step)) 	{
        return box;
    }

    else if (isBoxVBargraph(box, label, min, max)) 	{
        return box;
    }

    else if (isBoxHBargraph(box, label, min, max)) 	{
        return box;
    }

    // User Interface Groups

    else if (isBoxVGroup(box, label, t1)) 	{
        return boxVGroup(label, boxSimplification(t1));
    }

    else if (isBoxHGroup(box, label, t1)) 	{
        return boxHGroup(label, boxSimplification(t1));
    }

    else if (isBoxTGroup(box, label, t1)) 	{
        return boxTGroup(label, boxSimplification(t1));
    }

    // Slots and Symbolic Boxes

    else if (isBoxSlot(box)) 				{
        return box;;
    }

    else if (isBoxSymbolic(box, slot, body)){

        Tree b = boxSimplification(body);
        return boxSymbolic(slot,b);
    }

    // Block Diagram Composition Algebra

    else if (isBoxSeq(box, t1, t2)) 	{
        Tree s1 = boxSimplification(t1);
        Tree s2 = boxSimplification(t2);
        return boxSeq(s1,s2);
    }

    else if (isBoxPar(box, t1, t2)) 	{
        Tree s1 = boxSimplification(t1);
        Tree s2 = boxSimplification(t2);
        return boxPar(s1,s2);
    }

    else if (isBoxSplit(box, t1, t2)) 	{
        Tree s1 = boxSimplification(t1);
        Tree s2 = boxSimplification(t2);
        return boxSplit(s1,s2);
    }

    else if (isBoxMerge(box, t1, t2)) 	{
        Tree s1 = boxSimplification(t1);
        Tree s2 = boxSimplification(t2);
        return boxMerge(s1,s2);
    }
    else if (isBoxRec(box, t1, t2)) 	{
        Tree s1 = boxSimplification(t1);
        Tree s2 = boxSimplification(t2);
        return boxRec(s1,s2);
    }

    cout << "ERROR in file " << __FILE__ << ':' << __LINE__ << ", unrecognised box expression : " << *box << endl;
    exit(1);
    return 0;
}
