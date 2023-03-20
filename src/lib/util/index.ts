export const changeParam = (param: string) => {
  const engReg = /[^a-z|A-Z|0-9]/g;
  const SpaceToHyphenReg = /\s|_/g;
  const newParam = param.replace(engReg, '').replace(SpaceToHyphenReg, '-');
  console.log('newParam: ', newParam);

  return newParam ? newParam + '-' : '';
};
