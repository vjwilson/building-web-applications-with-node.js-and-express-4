var express = require('express');

var app = express();

var sql = require('mssql');
var config = {
  user: process.env.EXPRESS4VAN_DATABASE_USER,
  password: process.env.EXPRESS4VAN_DATABASE_PASSWORD,
  server: process.env.EXPRESS4VAN_DATABASE_SERVER,
  database: process.env.EXPRESS4VAN_DATABASE_DATABASE,
  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config)
  .then(function(res) {
    // console.log(res);
  })
  .catch(function(err) {
    console.log(err);
  });

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

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

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
    ]
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
