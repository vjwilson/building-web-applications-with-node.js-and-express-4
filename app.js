var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var nav = [
  {
    link: '/books',
    text: 'Books'
  },
  {
    link: '/authors',
    text: 'Authors'
  }
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'library', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true }));
require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Hello from EJS',
    nav: [
      {
        link: '/books',
        text: 'Books'
      },
      {
        link: '/authors',
        text: 'Authors'
      }
    ],
    message: res.message
  });
});

// app.get('/books', function(req, res) {
//   res.send('<html><h1>Book List</h1></html>');
// });

/* eslint-disable no-console */
app.listen(port, function() {
  console.log('Running server on port ' + port);
});
/* eslint-enable no-console */
