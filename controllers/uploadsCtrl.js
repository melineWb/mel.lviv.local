const bodyParser = require('body-parser');
const fs = require('fs-extra');
const busboy = require('connect-busboy');

const Galleries = require('../models/galleries');
const Media = require('../models/media');

const keysParser = require('./keysParser');

exports.artImgAdd = (req, res, dirname) => {
  let newArtItem = {publish: true};
  let fstream;
  req.pipe(req.busboy);

  let uploadFile = new Promise (function(resolve, reject){
    req.busboy.on('file', (fieldname, file, filename) => {
      const rumdomInt = Math.floor((Math.random() * 9999) + 1);
      const newFilename = `/uploads/${rumdomInt}_${filename}`;
      fstream = fs.createWriteStream(`${dirname}/public${newFilename}`);
      file.pipe(fstream);

      fstream.on('close', () => {
        newArtItem.url = newFilename;
        resolve();
      });
    });
  });

  let getFieldData = new Promise (function(resolve, reject){
    req.busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
      if (fieldname === 'title') {
        newArtItem.title = val;
      } else {
        newArtItem.keys = keysParser(val);
      }
      resolve();
    });
  });

  Promise.all([uploadFile, getFieldData]).then(async() => {
    let dbGalleriesCreate = new Galleries(newArtItem);
    await dbGalleriesCreate.save();
    res.redirect('/mel-admin/art/');

  }).catch((err) => {
    console.log(err);
  });

}

exports.uploadImg = (req, res, dirname) => {
  let editor = req.query.editor;
  let newMediaItem = {};

  let fstream;
  req.pipe(req.busboy);

  let uploadFile = new Promise (function(resolve, reject){
    req.busboy.on('file', (fieldname, file, filename) => {
      const rumdomInt = Math.floor((Math.random() * 9999) + 1);
      const newFilename = `/uploads/${rumdomInt}_${filename}`;
      fstream = fs.createWriteStream(`${dirname}/public${newFilename}`);
      file.pipe(fstream);

      fstream.on('close', () => {
        newMediaItem.url = newFilename;
        resolve();
      });
    });
  });

  uploadFile.then(async() => {
    if (editor) {
      res.status(200).json({data: newMediaItem.url});
    } else {
      let dbMediaCreate = new Media(newMediaItem);
      await dbMediaCreate.save();
      res.redirect('back');
    }
  }).catch((err) => {
    console.log(err);
  });
}
