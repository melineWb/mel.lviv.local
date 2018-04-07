var fileParser = function(host, file, callback) {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var reader = new XMLHttpRequest();
  var resDataArrC = [];
  var resDataItemN = {};
  var resDataItem = {};
  var results = [];
  var indexAnsw = 0;

  file = 'http://' + host + file;
  reader.open('get', file, true);

  reader.onreadystatechange = function() {
    if (reader.readyState == 4) {
      if (reader.status == 200 || reader.status == 0) {
        var allText = reader.responseText;
        allText = allText.split('\n');

        for (var i = 0; i < allText.length; i++) {
          var currntStr = allText[i].trim();
          if (currntStr !== '') {
            // ^\d*\. find question
            if (currntStr.search(/^\d*\./i) != '-1') {

              if (Object.keys(resDataItem).length != 0) {

                resDataItem.results = results;
                resDataArrC.push(resDataItem);
                resDataItem = {};
                results = [];
                indexAnsw = 0;
              }
              currntStr = currntStr.replace(/^\d*\./i, '');
              currntStr = currntStr.trim();
              resDataItem.question = currntStr;

            } else {
              // ^[a-z]\. find answers
              if (currntStr.search(/^[a-z]\./i) != '-1') {

                // \(t\) find (t)
                var leters = ['a', 'b', 'c', 'd', 'e', 'f'];
                if (currntStr.search(/\(t\)/i) != '-1') {

                  var trueI = leters[indexAnsw];
                  results.push(trueI);
                }
                currntStr = currntStr.replace(/^[a-z]\./i, '');
                currntStr = currntStr.replace(/\(t\)/i, '');
                currntStr = currntStr.trim();
                var answItemName = 'answer' + indexAnsw;
                resDataItem[answItemName] = currntStr;
                indexAnsw++;
              }
            }
          }

          if (allText.length == (i + 1)) {
            resDataItem.results = results;
            resDataArrC.push(resDataItem);
            // console.log("resDataArrC in js");
            // console.log(resDataArrC);
            callback(resDataArrC);
            return (resDataArrC);
          }
        }
      }
    }
  }
  reader.send(null);
}

module.exports = fileParser;
