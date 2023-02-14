import prettyPrint from './prettyprint.js';

const nodeFactory = (value = null, leftChild = null, rightChild = null) => {
  let storedValue = value;
  let storedLeftChild = leftChild;
  let storedRightChild = rightChild;

  const getValue = () => storedValue;
  const getLeftChild = () => storedLeftChild;
  const getRightChild = () => storedRightChild;

  const setValue = (newValue) => {
    storedValue = newValue;
  };
  const setLeftChild = (newLeftChild) => {
    storedLeftChild = newLeftChild;
  };
  const setRightChild = (newRightChild) => {
    storedRightChild = newRightChild;
  };

  return {
    getValue, getLeftChild, getRightChild, setValue, setLeftChild, setRightChild,
  };
};

const treeFactory = (array) => {
  const sortedArray = [...new Set(array.sort((a, b) => a - b))];
  const buildTree = (anArray) => {
    if (anArray.length === 0) return null;
    const midpoint = Math.floor(anArray.length / 2);
    const newNode = nodeFactory(anArray[midpoint]);
    newNode.setLeftChild(buildTree(anArray.slice(0, midpoint)));
    newNode.setRightChild(buildTree(anArray.slice(midpoint + 1)));

    return newNode;
  };

  let root = buildTree(sortedArray);
  const getRoot = () => root;

  const insert = (value, currentNode = root) => {
    if (root === null) {
      root = buildTree([value]);
    }

    if (currentNode === null) return nodeFactory(value);
    if (currentNode.getValue() === value) return currentNode;

    if (value < currentNode.getValue()) {
      currentNode.setLeftChild(insert(value, currentNode.getLeftChild()));
    } else {
      currentNode.setRightChild(insert(value, currentNode.getRightChild()));
    }

    return currentNode;
  };

  return { getRoot, insert };
};

const randArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 40));
const testArray = [2, 9, 10, 11, 12, 14, 21, 33, 35];
console.log([...new Set(testArray.sort((a, b) => a - b))]);

const testTree = treeFactory(testArray);
prettyPrint(testTree.getRoot());

testTree.insert(2);
prettyPrint(testTree.getRoot());

// const blankTree = treeFactory([]);
// prettyPrint(blankTree.getRoot());
// blankTree.insert(5);
// prettyPrint(blankTree.getRoot());
