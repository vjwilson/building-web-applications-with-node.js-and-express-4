var express = require('express');

var bookRouter = express.Router();

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
      res.render('bookListView', {
        title: 'Books',
        nav: nav,
        books: books
      });
    });

  bookRouter.route('/:id')
    .get(function(req, res) {
      var id = req.params.id;
      res.render('bookView', {
        title: 'Books',
        nav: nav,
        book: books[id]
      });
    });

  return bookRouter;
};

module.exports = router;
