export const changeParam = (param: string) => {
  const engReg = /[^a-z|A-Z]/g;
  const SpaceToHyphenReg = /\s|_/g;
  const newParam = param.replace(engReg, '').replace(SpaceToHyphenReg, '-');

  return newParam ? newParam + '-' : '';
};
