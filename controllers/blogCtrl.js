const Users = require('../models/users');
const Videos = require('../models/videos');
const Blogs = require('../models/blogs');
const Lifes = require('../models/lifes');

const keysParser = require('./keysParser');

let getKeysArr = (keysArr) => {
  let keysArrObjects = [];

  keysArr.forEach((item_1, index_1) => {
    let count = 0;
    if (item_1 !== undefined) {
      keysArr.forEach((item_2, index_2) => {
        if (item_1 == item_2) {
          count++;
        }
      });

      let obj = {
        str: item_1,
        font: `${12 + (count*2)}px`
      };

      keysArrObjects.push(obj);
    }
  });

  return keysArrObjects;

}

exports.login = function(req, res) {

}

exports.addVideo = async (req, res) => {
  let videoNew = {
    video: req.body.video,
    keys: keysParser(req.body.keys),
    publish: true
  }

  let dbVideoCreate = new Videos(videoNew);
  await dbVideoCreate.save();
  res.redirect('/mel-admin/video/');
}

exports.deleteVideo = async (req, res) => {
  await Videos.remove({_id: req.params.itemId});
  res.redirect('/mel-admin/video/');
}

exports.getVideos = async (req, res) => {
  let _videos = await Videos.find().sort({_id:-1});
  let keysArrObjects = [];
  let keysArr = [];

  _videos.forEach((item, index) => {
    let videoItem = item.keys;
    videoItem.forEach((keys, index) => {
      keysArr.push(keys);
    });
  });

  keysArrObjects = await getKeysArr(keysArr);

  res.render('videos', {
    videos: _videos,
    keys: keysArrObjects
  });
}

exports.getArticles = async (req, res, cat) => {
  let _articles = (cat == 'life') ? await Lifes.find().sort({_id:-1}) : await Blogs.find().sort({_id:-1});

  let keysArrObjects = [];
  let keysArr = [];

  _articles.forEach((item, index) => {
    let articleItem = item.keys;
    articleItem.forEach((keys, index) => {
      keysArr.push(keys);
    });
  });

  keysArrObjects = await getKeysArr(keysArr);

  res.render('blog', {
    articles: _articles,
    keys: keysArrObjects,
    cat: cat
  });
}

exports.getArticleItem = async(req, res, cat) => {
  let _article = (cat == 'life') ? await Lifes.findOne({url: req.params.url}) : await Blogs.findOne({url: req.params.url});

  res.render('article', {
    article: _article,
    cat: cat
  });
}

exports.articleAdd = async (req, res) => {
  const cat = req.body.cat;
  let newArticle = {};

  newArticle = {
    title: req.body.title,
    url: req.body.url,
    keys: keysParser(req.body.keys),
    publish: (req.body.publish === 'on') ? true : false,
    category: req.body.category,
    img: req.body.idImg,
    description: req.body.description,
    content: req.body.editor,
  }

  let articleCreate = (cat == 'development') ? new Blogs(newArticle) : new Lifes(newArticle)
  await articleCreate.save();

  res.redirect(`/mel-admin/${cat}`);
}
