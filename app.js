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
    // Creates a new tree with the given value if the tree is empty
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

  const deleteNode = (value, currentNode = root) => {
    if (root === null) return;
  };

  const find = (value, currentNode = root) => {
    if (currentNode === null) {
      console.log('Value not in tree');
      return null;
    }

    if (value === currentNode.getValue()) {
      return currentNode;
    }
    if (value < currentNode.getValue()) {
      return find(value, currentNode.getLeftChild());
    } if (value > currentNode.getValue()) {
      return find(value, currentNode.getRightChild());
    }
    return currentNode;
  };

  const levelOrder = (cb = null) => {
    // Return empty array if list is empty
    if (root === null) return [];

    const nodeQueue = [root];
    const valueArray = [];

    while (nodeQueue.length > 0) {
      // Add left child to the queue
      if (nodeQueue[0].getLeftChild()) {
        nodeQueue.push(nodeQueue[0].getLeftChild());
      }
      // Add right child to the queue
      if (nodeQueue[0].getRightChild()) {
        nodeQueue.push(nodeQueue[0].getRightChild());
      }
      // Add the first node in the queue's value to the array
      valueArray.push(nodeQueue.shift().getValue());
    }
    // Return the value array if no callback was provided
    if (cb === null) {
      return valueArray;
    }

    // Return the array with the callback applied to each value in the array
    return valueArray.map(cb);
  };

  // Runs a call back on node values in pre order or returns array if no cb
  const preOrder = (cb = null, currentNode = root, valueArray = []) => {
    if (currentNode === null) return null;

    // Run callback on value or add to the array
    cb ? cb(currentNode.getValue()) : valueArray.push(currentNode.getValue());

    preOrder(cb, currentNode.getLeftChild(), valueArray);
    preOrder(cb, currentNode.getRightChild(), valueArray);

    if (valueArray.length > 0) return valueArray;
  };

  return {
    getRoot, insert, deleteNode, find, levelOrder, preOrder,
  };
};

// const randArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 40));
const testArray = [2, 9, 10, 11, 12, 14, 21, 33, 35];
console.log([...new Set(testArray.sort((a, b) => a - b))]);

const testTree = treeFactory(testArray);
prettyPrint(testTree.getRoot());

testTree.insert(2);
function printValue(value) {
  console.log(`This is the node value ${value}`);
}

console.log(testTree.preOrder());
testTree.preOrder(printValue);
