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
