const changeParam = (param: string) => {
  const engReg = /[^a-z|A-Z|0-9]/g;
  const SpaceToHyphenReg = /\s|_/g;
  const newParam = param.replace(engReg, '').replace(SpaceToHyphenReg, '-');

  return newParam ? newParam + '-' : '';
};

const textLengthOverCut = (text: string) => {
  const engAndNumberReg = /[a-z|A-Z|0-9]/g;
  const krReg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  const onlyKR = text.replace(engAndNumberReg, '');
  const exceptKR = text.replace(krReg, '');

  if (onlyKR.length > 12) {
    text = text.substring(0, 12) + '...';
  } else if (exceptKR.length > 15) {
    text = text.substring(0, 16) + '...';
  }

  return text;
};

export { changeParam, textLengthOverCut };
