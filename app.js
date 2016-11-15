var express = require('express');

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

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');


app.use('/books', bookRouter);

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
