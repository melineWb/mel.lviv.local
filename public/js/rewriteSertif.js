var RewriteSertif = function(curentUserCertif, certifName, resultsMark){
  for (var i = 0; i < curentUserCertif.length; i++) {
    var currentResult = curentUserCertif[i];
    if (currentResult == certifName) {
      curentUserCertif.splice(i, 1);
      break;
    }
  }

  if (resultsMark === 'success') {
    curentUserCertif.push(certifName);
  }

  return curentUserCertif;
}

module.exports = RewriteSertif;
