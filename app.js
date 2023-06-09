var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator')
var fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventSourceRouter = require('./routes/eventSource');
var fileRouter = require('./routes/file');

var app = express();

var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
// setup the logger
morgan.token('requestParameters', function(req, res){
  return JSON.stringify(req.query) || '*';
});
morgan.token('requestBody', function(req, res){
  console.log('req.body-------', req.body)
  return JSON.stringify(req.body) || '*';
});
// create custom format，includes the custom token
morgan.format('custom-api', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :requestParameters :requestBody')
app.use(morgan('custom-api', {stream: accessLogStream}));
// app.use(morgan('combined', {stream: accessLogStream}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/file', fileRouter);
app.use('/event', eventSourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
