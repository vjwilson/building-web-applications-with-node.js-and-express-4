var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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

  adminRouter.route('/add-books')
    .get(function(req, res) {
      res.render('adminAddBooks', {
        title: 'Add Books',
        nav: nav
      });
    })
    .post(function(req, res) {
      var url = 'mongodb://localhost:27017/libraryApp';

      mongodb.connect(url, function(err, db) {
        var collection = db.collection('books');
        collection.insertMany(books, function(err, results) {
          res.send(results);
          db.close();
        });
      });
    });

  return adminRouter;
};

module.exports = router;
