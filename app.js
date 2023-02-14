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

  const root = buildTree(sortedArray);
  const getRoot = () => root;

  const insert = (value, currentNode = root) => {

  };

  return { getRoot, insert };
};

const testArray = [1, 3, 1, 2, 4, 5, 8, 7, 3, 6, 8, 10];
console.log([...new Set(testArray.sort((a, b) => a - b))]);
const testTree = treeFactory(testArray);

console.log(testTree.getRoot().getLeftChild().getValue());
