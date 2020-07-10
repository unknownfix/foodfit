const compose = (...fns: Function[]) => {
  if (fns.length === 0) {
    return (a: any) => a;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce((acc: Function, curr: Function) => (...args: any) => {
    return acc(curr(...args));
  });
};

export default compose;
