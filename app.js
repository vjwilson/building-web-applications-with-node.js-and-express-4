var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({ extname: '.hbs' }));

app.set('view engine', '.hbs');

app.get('/', function(req, res) {
  res.render('index', { title: 'Hello from render', list: ['1', '2', '3'] });
});

app.get('/books', function(req, res) {
  res.send('<html><h1>Book List</h1></html>');
});

/* eslint-disable no-console */
app.listen(port, function() {
  console.log('Running server on port ' + port);
});
/* eslint-enable no-console */
