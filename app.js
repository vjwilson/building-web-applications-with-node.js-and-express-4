var express = require('express');

var app = express();

var port = 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res) {
  res.send('<html><h1>Hello World</h1></html>');
});

app.get('/books', function(req, res) {
  res.send('<html><h1>Book List</h1></html>');
});

/* eslint-disable no-console */
app.listen(port, function() {
  console.log('Running server on port ' + port);
});
/* eslint-enable no-console */