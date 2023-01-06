const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  if(isValid(req.body.username)){
    users.push(JSON.stringify({"username" : `${req.body.username}` , "password" : `${req.body.password}`}))
   return res.status(200).json({message: `${req.body.username}  registered`});
  }
  else{
    return res.status(200).json({message: `Invalid username  and password`});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const myBooks = Object.values(books).filter((book) =>{
    return book.author === req.params.author;
  })
  return res.send(JSON.stringify(myBooks));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const myBooks = Object.values(books).filter((book) =>{
    return book.title === req.params.title;
  })
  return res.send(JSON.stringify(myBooks));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.send(books[req.params.isbn]["reviews"]);
});

module.exports.general = public_users;
