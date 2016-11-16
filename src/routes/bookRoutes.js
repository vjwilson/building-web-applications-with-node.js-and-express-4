var express = require('express');

var bookRouter = express.Router();

var sql = require('mssql');

var router = function(nav) {
  var books = [
    {
      title: 'War and Peace',
      genre: 'Historial Fiction',
      author: 'Leo Tolstoy',
      read: false
    },
    {
      title: 'Les Miserables',
      genre: 'Historial Fiction',
      author: 'Victor Hugo',
      read: true
    },
    {
      title: 'A Journey to the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      read: false
    },
    {
      title: 'The Lord of the Rings',
      genre: 'Fantasy',
      author: 'J.R.R. Tolkien',
      read: true
    },
    {
      title: 'Life on the Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    }
  ];

  bookRouter.route('/')
    .get(function(req, res) {
      var request = new sql.Request();

      request.query('SELECT * FROM books',
        function(err, resultset) {
          if (err || resultset.length === 0) {
            res.render('bookListView', {
              title: 'Books',
              nav: nav,
              books: []
            });
          } else {
            res.render('bookListView', {
              title: 'Books',
              nav: nav,
              books: resultset
            });
          }
        });
    });

  bookRouter.route('/:id')
    .all(function(req, res, next) {
      var id = req.params.id;
      var ps = new sql.PreparedStatement();
      ps.input('id', sql.Int);
      ps.prepare('SELECT * FROM books where id = @id',
        function(err) {
          ps.execute({ id: id },
            function(err, resultset) {
              if (err || resultset.length === 0) {
                res.status(404).send('Not found');
              } else {
                req.book = resultset[0];
                next();
              }
            });
        });
    })
    .get(function(req, res) {
      res.render('bookView', {
        title: 'Books',
        nav: nav,
        book: req.book
      });
    });

  return bookRouter;
};

module.exports = router;
