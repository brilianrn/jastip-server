function getDifferentValues(input, dbValue) {
  let temp = [], result = [];

  for (let i = 0; i < input.length; i++) {
    temp[input[i]] = true;
  }

  for (let i = 0; i < dbValue.length; i++) {
    if (temp[dbValue[i]]) {
      delete temp[dbValue[i]];
    } else {
      temp[dbValue[i]] = true;
    }
  }

  for (let k in temp) {
    result.push(k);
  }

  return result;
}

module.exports = getDifferentValues;