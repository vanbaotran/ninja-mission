require('dotenv').config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors')

mongoose
  .connect('mongodb://localhost/ninja-mission', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// ADD SESSION SETTINGS HERE:
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true,
  // cookie: { maxAge: 60000*60*24*14 },
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/ninja-mission',
  autoRemove: 'interval',
  autoRemoveInterval: 60*24*14 // In minutes. Default)
 })
}));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const userRouter = require("./routes/user-routes");
app.use('/users', userRouter)
const postRouter = require('./routes/post-routes');
app.use('/posts', postRouter);
const applicationRouter = require('./routes/application-routes');
app.use('/applications',applicationRouter)

module.exports = app;
