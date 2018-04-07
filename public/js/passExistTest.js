var PassExistTest = function(curentUserResults, idTest, resultsMark, tName){
  for (var i = 0; i < curentUserResults.length; i++) {
    var currentResult = curentUserResults[i];
    if (currentResult._id == idTest) {
      curentUserResults.splice(i, 1);
      break;
    }
  }

  var tmp = {};
  tmp._id = idTest;
  tmp.name = tName;
  tmp.mark = resultsMark;
  curentUserResults.push(tmp);

  return curentUserResults;
}

module.exports = PassExistTest;
