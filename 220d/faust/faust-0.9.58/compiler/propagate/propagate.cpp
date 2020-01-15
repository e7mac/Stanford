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
 
 
 
#include "propagate.hh"
#include "prim2.hh"
#include <assert.h>
#include "ppbox.hh"
#include "xtended.hh"
#include "labels.hh"
#include "Text.hh"
#include "ppsig.hh"
#include "names.hh"

//extern bool gPrintDocSwitch;
//static siglist realPropagate (Tree slotenv, Tree path, Tree box, const siglist&  lsig);


////////////////////////////////////////////////////////////////////////
/**
 * propagate : box listOfSignal-> listOfSignal'
 *
 * Propage une liste de signaux de l'entrée vers la sortie d'une boite
 * La boite a été annotée aec son type 
 */
///////////////////////////////////////////////////////////////////////


//! mix une liste de signaux sur n bus				
siglist mix(const siglist& lsig, int nbus)
{
	int nlines	= lsig.size();
	
	siglist dst(nbus);
	
	for (int b=0; b<nbus; b++) {
		Tree t = (b<nlines) ? lsig[b] : sigInt(0);
		for (int i=b+nbus; i<nlines; i+=nbus) {
			t = sigAdd(t, lsig[i]);
		}
		dst[b] = t;
	}
	return dst;
}			

//! split une liste de signaux sur n bus				
siglist split(const siglist& inputs, int nbus)
{
	int nlines	= inputs.size();
	
	siglist outputs(nbus);
	
	for (int b=0; b<nbus; b++) {
		outputs[b] = inputs[b % nlines];
	}
	return outputs;
}			

//! Fabrique une liste de n projections d'un groupe récursif
siglist makeSigProjList (Tree t, int n)
{
	siglist l(n);
	for (int i = 0; i < n; i++) l[i] = sigDelay0(sigProj(i, t));
	return l;
}

//! Fabrique une liste de n mem projections d'un groupe récursif
siglist makeMemSigProjList (Tree t, int n)
{
	siglist l(n);
	for (int i = 0; i < n; i++) l[i] = sigDelay1(sigProj(i, t));
	return l;
}


//! Fabrique une liste de n entrées
siglist makeSigInputList (int n)
{
	siglist l(n);
	for (int i = 0; i < n; i++) l[i] = sigInput(i);
	return l;
}

inline siglist makeList(Tree t)
{
	siglist l(1);
	l[0] = t;
	return l;
}

siglist listRange(const siglist& l, int i, int j)
{
	siglist r(j-i);
	for (int x = i; x < j; x++) r[x-i] = l[x];
	return r;
}

siglist listConcat(const siglist& a, const siglist& b)
{
	int n1 = a.size();
	int n2 = b.size();
	siglist r(n1+n2);
	
	for (int x=0; x<n1; x++) r[x] = a[x];
	for (int x=0; x<n2; x++) r[x+n1] = b[x];
	return r;
}

/**
 * Convert an stl list of signals into a tree list of signals
 */
Tree listConvert(const siglist& a)
{
	int 	n = a.size();
	Tree 	t=nil;
	while (n--) t = cons(a[n],t);
	return t;
}

// siglist listConvertBack(Tree l)
// {
// 	siglist r;
// 	while (!isNil(l)) { r.push_back(hd(l)); l = tl(l); }
// 	return r;
// }

siglist listLift(const siglist& l)
{
	int 		n = l.size();
	siglist		r(n);
	
	for(int i = 0; i<n; i++) r[i] = lift(l[i]);
	return r;
}

static int	gDummyInput = 10000;

/**
 * Propagate computes the outputs signals of a block-diagram according to a list of input signals.
 *
 *\param slotenv input signals associated with symbolic slots
 *\param path stack of user interface groups : (type,label)*
 *\param box block-diagram where we propagate the signals
 *\param lsig list of signals to be propagated into box
 *\return list of resulting signals
 */
/*
// for debugging purposes

siglist realpropagate (Tree slotenv, Tree path, Tree box, const siglist&  lsig);

siglist propagate (Tree slotenv, Tree path, Tree box, const siglist&  lsig)
{
	cerr << "propagate in " << boxpp(box) << endl; 
	for (int i=0; i<lsig.size(); i++) { cerr << " -> signal " << i << " : " << *(lsig[i]) << endl; }
	cerr << endl;
	return realpropagate (slotenv, path, box, lsig);
}
*/

/**
 * Old try for names propagation.
 */
//siglist propagate (Tree slotenv, Tree path, Tree box, const siglist&  lsig)
//{
//	siglist S = realPropagate(slotenv, path, box, lsig);
//
//	if (gPrintDocSwitch) {
//		Tree	id;
//		if (lsig.size()==0 && getDefNameProperty(box, id)) {
//			string nickname = defName2NickName(tree2str(id));
//			//setSigListNickName(S, nickname);
//		}
//	}
//
//	return S;
//}

//siglist realPropagate (Tree slotenv, Tree path, Tree box, const siglist&  lsig)
siglist propagate (Tree slotenv, Tree path, Tree box, const siglist&  lsig)
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
		assert(lsig.size() == xt->arity());
		return makeList(xt->computeSigOutput(lsig));
	}
		
	// Numbers and Constants
	
	else if (isBoxInt(box, &i)) 	{ 
		assert(lsig.size()==0); 
		return makeList(sigInt(i)); 
	}
	else if (isBoxReal(box, &r)) 	{ 
		assert(lsig.size()==0); 
		return makeList(sigReal(r)); 
	}
    
    else if (isBoxFConst(box, type, name, file))    { 
        assert(lsig.size()==0); 
        return makeList(sigFConst(type, name, file)); 
    }
    
    else if (isBoxFVar(box, type, name, file))    { 
        assert(lsig.size()==0); 
        return makeList(sigFVar(type, name, file)); 
    }
	
	// Wire and Cut
	
	else if (isBoxCut(box)) 				{ 
		assert(lsig.size()==1); 
		return siglist(); 
	}
	
	else if (isBoxWire(box)) 				{ 
		assert(lsig.size()==1); 
		return lsig;  
	}
	
	// Slots and Symbolic Boxes
	
	else if (isBoxSlot(box)) 				{ 
		Tree sig;
		assert(lsig.size()==0); 
		if (!searchEnv(box,sig,slotenv)) {
			// test YO simplification des diagrames
			//fprintf(stderr, "propagate : internal error (slot undefined)\n");
			//exit(1);
			sig = sigInput(++gDummyInput);
		}
		return makeList(sig);
	}
	
	else if (isBoxSymbolic(box, slot, body)) 				{ 
		assert(lsig.size()>0); 
		return propagate(pushEnv(slot,lsig[0],slotenv), path, body, listRange(lsig, 1, lsig.size()));
	}
	
	// Primitives
	
	else if (isBoxPrim0(box, &p0)) 			{ 
		assert(lsig.size()==0); 
		return makeList( p0() );  
	}
	
	else if (isBoxPrim1(box, &p1)) 				{ 
		assert(lsig.size()==1); 
		return makeList( p1(lsig[0]) );  
	}
	
	else if (isBoxPrim2(box, &p2)) 				{ 
//		printf("prim2 recoit : "); print(lsig); printf("\n");
		assert(lsig.size()==2); 
		return makeList( p2(lsig[0],lsig[1]) );  
	}
	
	else if (isBoxPrim3(box, &p3)) 				{ 
		assert(lsig.size()==3); 
		return makeList( p3(lsig[0],lsig[1],lsig[2]) );  
	}
	
	else if (isBoxPrim4(box, &p4)) 				{ 
		assert(lsig.size()==4); 
		return makeList( p4(lsig[0],lsig[1],lsig[2],lsig[3]) );  
	}
	
	else if (isBoxPrim5(box, &p5)) 				{ 
		assert(lsig.size()==5); 
		return makeList( p5(lsig[0],lsig[1],lsig[2],lsig[3],lsig[4]) );  
	}
	
	else if (isBoxFFun(box, ff)) 				{ 
		//cerr << "propagate en boxFFun of arity " << ffarity(ff) << endl;
		assert(int(lsig.size())==ffarity(ff)); 
		return makeList(sigFFun(ff, listConvert(lsig)));  
	}
	
	// User Interface Widgets
	
	else if (isBoxButton(box, label)) 	{ 
		assert(lsig.size()==0); 
		return makeList(sigButton(normalizePath(cons(label, path)))); 
	}
	
	else if (isBoxCheckbox(box, label)) 	{ 
		assert(lsig.size()==0); 
		return makeList(sigCheckbox(normalizePath(cons(label, path)))); 
	}
	
	else if (isBoxVSlider(box, label, cur, min, max, step)) 	{ 
		assert(lsig.size()==0); 
		return makeList(sigVSlider(normalizePath(cons(label, path)), cur, min, max, step)); 
	}
	
	else if (isBoxHSlider(box, label, cur, min, max, step)) 	{ 
		assert(lsig.size()==0); 
		return makeList(sigHSlider(normalizePath(cons(label, path)), cur, min, max, step)); 
	}
	
	else if (isBoxNumEntry(box, label, cur, min, max, step)) 	{ 
		assert(lsig.size()==0); 
		return makeList(sigNumEntry(normalizePath(cons(label, path)), cur, min, max, step)); 
	}
	
	else if (isBoxVBargraph(box, label, min, max)) 	{ 
		assert(lsig.size()==1); 
		return makeList(sigVBargraph(normalizePath(cons(label, path)), min, max, lsig[0])); 
	}
	
	else if (isBoxHBargraph(box, label, min, max)) 	{ 
		assert(lsig.size()==1); 
		return makeList(sigHBargraph(normalizePath(cons(label, path)), min, max, lsig[0])); 
	}
	
	// User Interface Groups
	
	else if (isBoxVGroup(box, label, t1)) 	{ 
		return propagate(slotenv,cons(cons(tree(0),label), path), t1, lsig); 
	}
	
	else if (isBoxHGroup(box, label, t1)) 	{ 
		return propagate(slotenv, cons(cons(tree(1),label), path), t1, lsig); 
	}
	
	else if (isBoxTGroup(box, label, t1)) 	{ 
		return propagate(slotenv, cons(cons(tree(2),label), path), t1, lsig); 
	}
	
	// Block Diagram Composition Algebra
	
	else if (isBoxSeq(box, t1, t2)) 	{ 
		int in1, out1, in2, out2;
		getBoxType(t1, &in1, &out1);
		getBoxType(t2, &in2, &out2);

        assert(out1==in2);

		if (out1 == in2) {
			return propagate(slotenv, path, t2, propagate(slotenv, path,t1,lsig));
		} else if (out1 > in2) {
			siglist lr = propagate(slotenv, path, t1,lsig);
			return listConcat(propagate(slotenv, path, t2, listRange(lr, 0, in2)), listRange(lr, in2, out1));
		} else {
			return propagate(slotenv, path, t2, listConcat( propagate(slotenv, path, t1, listRange(lsig,0,in1)), listRange(lsig,in1,in1+in2-out1) ) );
		}
	}
	
	else if (isBoxPar(box, t1, t2)) 	{ 
		int in1, out1, in2, out2;
		getBoxType(t1, &in1, &out1);
		getBoxType(t2, &in2, &out2);
			
		return listConcat(	propagate(slotenv, path, t1, listRange(lsig, 0,  in1)), 
							propagate(slotenv, path, t2, listRange(lsig, in1, in1+in2)) );
	}
	
	else if (isBoxSplit(box, t1, t2)) 	{ 
		int in1, out1, in2, out2;
		getBoxType(t1, &in1, &out1);
		getBoxType(t2, &in2, &out2);
		
		siglist l1 = propagate(slotenv, path, t1, lsig);
		siglist l2 = split(l1, in2);
		return propagate(slotenv, path, t2, l2);
	}
	
	else if (isBoxMerge(box, t1, t2)) 	{ 
		int in1, out1, in2, out2;
		getBoxType(t1, &in1, &out1);
		getBoxType(t2, &in2, &out2);
		
		siglist l1 = propagate(slotenv, path, t1, lsig);
		siglist l2 = mix(l1, in2);
		return propagate(slotenv, path, t2, l2);
	}
/*	
	else if (isBoxRec(box, t1, t2)) 	{ 
		int in1, out1, in2, out2;
		getBoxType(t1, &in1, &out1);
		getBoxType(t2, &in2, &out2);
		
		siglist l0 = makeSigProjList(ref(1), in2);
		siglist l1 = propagate(slotenv, path, t2, l0);
		siglist l2 = propagate(slotenv, path, t1, listConcat(l1,listLift(lsig)));
		Tree g = rec(listConvert(l2));
		return makeSigProjList(g, out1);
	}
*/	
    else if (isBoxRec(box, t1, t2)) 	{
        // Bug Corrected
        int in1, out1, in2, out2;
        getBoxType(t1, &in1, &out1);
        getBoxType(t2, &in2, &out2);

        Tree slotenv2 = lift(slotenv); // the environment must also be lifted

        siglist l0 = makeMemSigProjList(ref(1), in2);
        siglist l1 = propagate(slotenv2, path, t2, l0);
        siglist l2 = propagate(slotenv2, path, t1, listConcat(l1,listLift(lsig)));
        Tree g = rec(listConvert(l2));
        return makeSigProjList(g, out1);
    }

	cout << "ERROR in file " << __FILE__ << ':' << __LINE__ << ", unrecognised box expression : " << boxpp(box) << endl;
	exit(1);
	return siglist();
}

	
Tree boxPropagateSig (Tree path, Tree box, const siglist& lsig)
{
	return listConvert(propagate(nil, path, box, lsig));
}

