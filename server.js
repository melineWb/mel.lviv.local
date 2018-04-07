const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const express = require('express');
const pug = require('pug');

let path = require('path');
const busboy = require('connect-busboy');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const favicon = require('serve-favicon');
const currentUser = false;


// mongoose.connect('mongodb://localhost/testsystem');
// mongoose.connect('mongodb://meline:qwerty654321@ds161042.mlab.com:61042/testsystem');
let env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const Users = require('./models/users');
const Blogs = require('./models/blogs');
const Lifes = require('./models/lifes');
const Galleries = require('./models/galleries');
const Videos = require('./models/videos');
const Media = require('./models/media');

// controllers
let blogCtrl = require('./controllers/blogCtrl');
let uploadsCtrl = require('./controllers/uploadsCtrl');

let app = express();

app.use(cookieParser());
app.use(session({
  secret: 'meline_test_system',
  key: 'skey',
  saveUninitialized: true,
  resave: true,
  proxy: true,
  cookie: {
    secure: !true
  }
}));
app.use(flash());
app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.set('views', __dirname + '/views/');
app.set('view engine', 'pug');
app.use('/', express.static(path.join(__dirname + '/public/')));
app.use(favicon(__dirname + '/public/favicon.ico'));


app.get('/', async (req, res) => {
  let _lastArt = await Galleries.find().sort({_id:-1}).limit(6);
  let _blogs = await Blogs.find().sort({_id:-1}).limit(3);
  let _lifes = await Lifes.find().sort({_id:-1}).limit(3);

  res.render('index', {
    lastArt: _lastArt,
    blogs: _blogs,
    lifes: _lifes
  });
});

app.get('/videos', blogCtrl.getVideos);

app.get('/development', (req, res) => {
  blogCtrl.getArticles(req, res, 'development');
});

app.get('/life', (req, res) => {
  blogCtrl.getArticles(req, res, 'life');
});

app.get('/development/:url', (req, res) => {
  blogCtrl.getArticleItem(req, res, 'development');
});

app.get('/art', async (req, res) => {
  let _images = await Galleries.find().sort({_id:-1});
  res.render('art', {
    images: _images
  });
});

app.get('/art/services', (req, res) => res.render('services'));

app.get('/mel-admin/video/', async (req, res) => {
  let _videos = await Videos.find();
  res.render('admin_video', {
    videos: _videos
  });
});

app.post('/mel-admin/video/', (req, res) => {
  blogCtrl.addVideo(req, res);
});

app.post('/mel-admin/video/:itemId', blogCtrl.deleteVideo);

app.get('/mel-admin', async (req, res) => {
  res.render('admin_index', {});
});

app.get('/mel-admin/development', async (req, res) => {
  let _articles = await Blogs.find({}, {
    _id: 1,
    title: 1,
    category: 1,
    publish: 1
  }).sort({_id:-1});
  res.render('admin_blog', {
    title: 'Development',
    articles: _articles
  });
});

app.get('/mel-admin/life', async (req, res) => {
  let _articles = await Lifes.find({}, {
    _id: 1,
    title: 1,
    category: 1,
    publish: 1
  }).sort({_id:-1});
  res.render('admin_blog', {
    title: 'Life',
    articles: _articles
  });
});

app.get('/mel-admin/development/add', async (req, res) => {
  let _media = await Media.find();

  res.render('admin_blog_add', {
    cat: 'development',
    images: _media,
  });
});

app.post('/mel-admin/media/', (req, res) => {
  console.log("send req");
  uploadsCtrl.uploadImg(req, res, __dirname);
});

app.post('/mel-admin/article/add', (req, res) => {
  blogCtrl.articleAdd(req, res);
});



app.get('/mel-admin/life/add', async (req, res) => {
  res.render('admin_blog_add', {
    cat: 'life'
  });
});

app.get('/mel-admin/art/', async (req, res) => {
  let _images = await Galleries.find();
  res.render('admin_art', {
    images: _images,
    title: 'art'
  });
});

app.post('/mel-admin/art/', (req, res) => {
  uploadsCtrl.artImgAdd(req, res, __dirname);
});

app.listen(config.server.port, function() {
  console.log(`server start at url ${config.url}`);
});
