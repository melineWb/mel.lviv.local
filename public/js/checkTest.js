var CheckTest = function(trueData, answersData) {
  this.trueData = trueData;
  this.answersData = answersData;
  this.countMark = 0;

  this.fullResults = [];

  this.checkData = function(i) {
    var fullResults = this.fullResults;
    var answersData = this.answersData;
    var trueData = this.trueData;
    answersData = answersData[i];
    trueData = trueData[i];
    trueData = trueData.results;
    var resulCurrent = [];

    var countMark = this.countMark;

    if (typeof answItem == 'string') {
      answItem = [answItem];
    }

    var trueDataL = trueData.length;
    var answersDataL = answersData.length;

    if (trueDataL <= 1) {
      var tmp = {};
      var answersDataCurrnt = answersData[0];
      tmp[answersDataCurrnt] = false;
      if (trueData[0] == answersDataCurrnt) {
        tmp[answersDataCurrnt] = true;
        countMark = countMark + 1;
      }
      resulCurrent.push(tmp);
      fullResults.push(resulCurrent);
    } else {
      for (var i = 0; i < answersDataL; i++) {
        var answersDataCurrnt = answersData[i];
        var tmp = {};
        tmp[answersDataCurrnt] = false;
        for (var j = 0; j < trueDataL; j++) {
          if (answersData[i] == trueData[j]) {
            tmp[answersDataCurrnt] = true;
          }
        }
        resulCurrent.push(tmp);
      }
      // if (trueDataL >= answersDataL) {
      //
      //   for (var j = 0; j < trueDataL; j++) {
      //     for (var i = 0; i < answersDataL; i++) {
      //       var tmpExist = false;
      //       console.log('answersData123 = ' + answersData[i]);
      //       console.log('trueData123 = ' + trueData[j]);
      //
      //       if (trueData[j] == answersData[i]) {
      //         var tmpExist = true;
      //       }
      //     }
      //
      //     if (!tmpExist) {
      //       var tmp = {};
      //       var trueDataCurrnt = trueData[j];
      //       tmp[trueDataCurrnt] = false;
      //       resulCurrent.push(tmp);
      //     }
      //   }
      // }

      fullResults.push(resulCurrent);
      console.log(resulCurrent)

      var iMark = 0;
      for (var i = 0; i < resulCurrent.length; i++) {
        var curRes = resulCurrent[i];
        for (key in curRes) {
          // console.log(key + " = key = " + curRes[key]);
          iMark = (curRes[key]) ? (iMark + 1) : (iMark - 0.5);
        }
      }


      // console.log("iMark = " + iMark);


      if (iMark == answersDataL) {
        countMark = countMark + 1;
      } else if (iMark >= (answersDataL - answersDataL / 3)) {
        countMark = countMark + 0.5;
      }
    }
    // console.log("countMark = " + countMark);
    this.countMark = countMark;
    this.fullResults = fullResults;
  }

  this.getPersents = function() {
    var countMark = this.countMark;
    var trueDataMax = this.trueData.length;
    var countMark = (countMark * 100) / trueDataMax;
    // console.log(`countMark2 = ${countMark}`);

    this.countMark = countMark;
    return countMark;
  }

  this.getResults = function(min) {
    var result = '';
    var minResult = min;
    var countMark = this.countMark;

    if (countMark < min) {
      result = 'fail';
    } else if (countMark >= 80) {
      result = 'success';
    } else {
      result = 'pass';
    }

    return result;
  }

  this.readFullResults = function(){
    return this.fullResults;
  }
};

module.exports = CheckTest;
