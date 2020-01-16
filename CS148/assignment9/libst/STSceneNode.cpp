
#include <assert.h>

#include "stgl.h"
#include "STSceneNode.h"



STScene::STScene() {
	mRoot = new STSceneNode(NULL, NULL, NULL, NULL);
}

/**
* Destructor ensures that all nodes in the scene are destroyed
* Note that the scene graph does not own the objects contained
* within these nodes.  It is the responsibility of the caller
* to free them
*/
STScene::~STScene() {

	Clear();
	delete mRoot;
}


/**
* Returns root node of the scene graph
*/ 
STSceneNode*
STScene::GetRoot() {
	return mRoot;
}


/**
* Destroys all nodes in the scene graph.  At the end of this call, the
* scene will contain only an empty root node.  Note that since the STSceneNodes
* do not own the encapsulated Drawable objects, these objects need to be
* freed elsewhere.
*/
void
STScene::Clear() {
	STSceneNode* n = mRoot->GetFirstChild();
	while (n) {
		mRoot->DeleteNode(n);
		n = mRoot->GetFirstChild();
	}

	delete mRoot;
	mRoot = new STSceneNode(NULL, NULL, NULL, NULL);
}


/**
* Recursively traverses scene graph to draw all objects
*/
void
STScene::Draw() {
	return mRoot->Draw();
}


STSceneNode::STSceneNode(STDrawable* obj, STSceneNode* parent, STSceneNode* prev, STSceneNode* next)
	: mObj(obj), mParentNode(parent), mPrevNode(prev), mNextNode(next),
	  mChildrenHead(NULL), mChildrenTail(NULL), mNumChildren(0)
{ }


STSceneNode::~STSceneNode() {

	// if any of these assertions fails it means we're leaking memory
	assert(mChildrenHead == NULL );
	assert(mChildrenTail == NULL );
	assert(mNumChildren == 0);
}


/**
* Creates a new child node, inserting the new node in the list of children
* *AFTER* the node pointed to by insertAfter.  If 'insertAfter' is NULL, then
* the new node will be added at the head of the child nodes list.  
* To create a new node at the end of the list, use n.CreateNode(n.GetLastChild())
*/
STSceneNode*
STSceneNode::CreateNode(STSceneNode* insertAfter) {
	
	STSceneNode* insertBefore = mChildrenHead;

	if (insertAfter) {
		assert(insertAfter->GetParent() == this);
		insertBefore = insertAfter->GetNext();
	}
	
	STSceneNode* newNode = new STSceneNode(NULL, this, insertAfter, insertBefore);

	if (insertAfter)
		insertAfter->mNextNode = newNode;
	else
		mChildrenHead = newNode;
	
	if (insertBefore)
		insertBefore->mPrevNode = newNode;
	else
		mChildrenTail = newNode;

	mNumChildren++;

	return newNode;
}

/**
* Removes the specified child node from the scene
* graph and deallocates it.  Recursely destroyes all
* child nodes of the node to delete
*/
void
STSceneNode::DeleteNode(STSceneNode* toRemove) {

	assert(toRemove);
	assert(toRemove->GetParent() == this);
	assert(mNumChildren > 0);

	// will delete entire subtree of nodes
	STSceneNode* n = toRemove->GetFirstChild();
	while (n) {
		toRemove->DeleteNode(n);
		n = toRemove->GetFirstChild();
	}

	if (toRemove->GetPrev())
		toRemove->GetPrev()->mNextNode = toRemove->GetNext();
	else
		mChildrenHead = toRemove->GetNext();

	if (toRemove->GetNext())
		toRemove->GetNext()->mPrevNode = toRemove->GetPrev();
	else
		mChildrenTail = toRemove->GetPrev();

	mNumChildren--;

	delete toRemove;

}

/**
* Adds an object to the scene graph.  This is merely a convenience
* function, and would be equivalent to:
	newnode = n->CreateNode(insertAfter);
	newnode->SetObject(obj);
*/
STSceneNode*
STSceneNode::PlaceObj(STDrawable* obj, STSceneNode* insertAfter) {

	STSceneNode* node = CreateNode(insertAfter);

	node->mObj = obj;
	return node;
}


/**
* Returns the object associated with this node
*/
STDrawable*
STSceneNode::GetObj() {
	return mObj;
}


/**
* Returns the node's parent, will but NULL *ONLY* for the root node
*/
STSceneNode*
STSceneNode::GetParent() {
	return mParentNode;
}

/**
* Returns the node's sibling that preceeds the node in the parent's child list
* Will return NULL is this is the first child in the list
*/
STSceneNode*
STSceneNode::GetPrev() {
	return mPrevNode;
}


/**
* Returns the node's sibling that follows the node in the parent's child list
* Will return NULL if this is the last child in the list
*/
STSceneNode*
STSceneNode::GetNext() {
	return mNextNode;
}


/**
* Returns the first child of this node, NULL if no children
*/
STSceneNode*
STSceneNode::GetFirstChild() {
	return mChildrenHead;
}


/**
* Returns the last child of this node, NULL if no children
*/
STSceneNode*
STSceneNode::GetLastChild() {
	return mChildrenTail;
}


/**
* Returns the number of child nodes
*/
int
STSceneNode::GetNumChildren() const {
	return mNumChildren;
}


/**
* Recursively draws objects in the section of the scene graph rooted by
* this node in a preorder traversal.  The order of drawing is:
*   1) current node's object (if any)
*   2) child node objects (in order of the children list) 
*/
void
STSceneNode::Draw() {

	glPushMatrix();

	glMultMatrixf(mTransform.GetGLMatrix());

	if (mObj)
		mObj->Draw();

	STSceneNode* n = GetFirstChild();

	while (n) {
		n->Draw();
		n = n->GetNext();
	}

	glPopMatrix();
}

/**
* Returns the transform associated with this node
*/
const STTransform&
STSceneNode::GetTransform() {
	return mTransform;
}

/**
* Sets the transform associated with this node
*/
void
STSceneNode::SetTransform(const STTransform& xform) {
	mTransform = xform;
}

