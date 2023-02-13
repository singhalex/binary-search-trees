const nodeFactory = (value = null, leftChildren = null, rightChildren = null) => {
  let storedValue = value;
  let storedLeftChildren = leftChildren;
  let storedRightChildren = rightChildren;

  const getValue = () => storedValue;
  const getLeftChildren = () => storedLeftChildren;
  const getRightChildren = () => storedRightChildren;

  const setValue = (newValue) => {
    storedValue = newValue;
  };
  const setLeftChildren = (newLeftChildren) => {
    storedLeftChildren = newLeftChildren;
  };
  const setRightChildren = (newRightChildren) => {
    storedRightChildren = newRightChildren;
  };

  return {
    getValue, getLeftChildren, getRightChildren, setValue, setLeftChildren, setRightChildren,
  };
};

const treeFactory = (array) => {
  const sortedArray = [...new Set(array.sort((a, b) => a - b))];

  const buildTree = (anArray) => {
    if (anArray.length === 0) return null;
    const midpoint = Math.floor(anArray.length / 2);
    const newNode = nodeFactory(anArray[midpoint]);
    newNode.setLeftChildren(buildTree(anArray.slice(0, midpoint)));
    newNode.setRightChildren(buildTree(anArray.slice(midpoint + 1)));

    return newNode;
  };

  const root = buildTree(sortedArray);
  const getRoot = () => root;

  return { getRoot };
};

const testArray = [1, 3, 1, 2, 4, 5, 8, 7, 3, 6, 8, 10];
console.log([...new Set(testArray.sort((a, b) => a - b))]);
const testTree = treeFactory(testArray);

console.log(testTree.getRoot().getValue());

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.getRightChildren() !== null) {
    prettyPrint(node.getRightChildren(), `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue()}`);
  if (node.getLeftChildren() !== null) {
    prettyPrint(node.getLeftChildren(), `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(testTree.getRoot());
