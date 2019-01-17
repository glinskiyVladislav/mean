let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./app_server/routes/index');
let usersRouter = require('./app_server/routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//@Ускорение рендера путем минификации файла
app.use((req, res, next) => {
  const render = res.render;
  res.render = function (view, in_options, fn) {

    let self = this;
    let options = in_options || {};
    const req = this.req;
    let defaultFn;

    if (typeof options == 'function') {
      fn = options;
      options = {};
    }
    defaultFn = (err, str) => {
      if (err) return req.next(err);
      self.send(str);
    };
    if (typeof fn != 'function') {
      fn = defaultFn;
    }

    render.call(self, view, options, (err, html) => {
      const minify = require('html-minifier').minify;
      let result = html;
      try {
        result = minify(html, {
          removeAttributeQuotes: true,
          minifyCSS: true,
          collapseWhitespace: true
        });
      } catch (err) {}
      fn(err, result);
    });
  };
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error', {
//     message: 'Server Error'
//   });
// });

module.exports = app;
