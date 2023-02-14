const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return console.log('Emptry tree');
  if (node.getRightChild() !== null) {
    prettyPrint(node.getRightChild(), `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue()}`);
  if (node.getLeftChild() !== null) {
    prettyPrint(node.getLeftChild(), `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

export default prettyPrint;
