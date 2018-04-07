var ReadAnswers = function(){
  this.arr = [];

  this.parseData = function(obj){
    var answersArr = {};
    var arr = this.arr;

    for (key in obj) {
      if (key.indexOf('answer') != '-1') {
        answersArr[key] = obj[key];
      } else{
        if (key.indexOf('questionname') == '-1') {
          var tmp = {};
          tmp[key] = obj[key];
          arr.push(tmp);
        }
      }
    }
    this.arr = arr;
    return answersArr;
  }

  this.getResults = function(){
    var arr = this.arr;
    console.log(arr);
    var resultArr = [];
    for (var i = 0; i < arr.length; i++) {
      var currntItem = this.arr[i];
      for (key in currntItem) {
        if (currntItem[key] === 'on') {
          resultArr.push(key);
        }
      }
    }
    return resultArr;
  }
};

module.exports = ReadAnswers;
