const express = require('express');
let books = require("./booksdb.js");
const { default: axios } = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios').default;

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 4))

});

//get book list using axios
app.get('/', async (req, res) => {
    try {
      // Make a GET request to the server to fetch the book list
      const response = await axios.get(serverUrl);
  
      // Assuming the book list is in the response.data
      const books = response.data;
  
      // Send the book list as a JSON response
      res.json(books);
    } catch (error) {
      // Handle errors
      console.error('Error fetching book list:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books = books[isbn];
  return res.send(filtered_books)
//   return res.status(300).json({message: "Yet to be implemented"});
 });

 // get book detial by isbn using axios
 app.get('/isbn/:isbn', async (req, res) => {
    try {
      const isbn = req.params.isbn;
  
      // Make a GET request to fetch book details based on ISBN
      const response = await axios.get(`http://your-server-url/api/books/isbn/${isbn}`);
  
      // Assuming the book details are in the response.data
      const bookDetails = response.data;
  
      // Send the book details as a JSON response
      res.json(bookDetails);
    } catch (error) {
      console.error('Error fetching book details:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here\
  const bookArray = Object.values(books)
  const author = req.params.author;
  let filtered_books = bookArray.filter((book) => book.author === author)
  return res.send(filtered_books)
//   return res.status(300).json({message: "Yet to be implemented"});
});

// get book by author using axios
app.get('/author/:author', async (req, res) => {
    try {
      const author = req.params.author;
  
      // Make a GET request to fetch book details based on author
      const response = await axios.get(`http://your-server-url/api/books/author/${author}`);
  
      // Assuming the book details are in the response.data
      const bookDetails = response.data;
  
      // Send the book details as a JSON response
      res.json(bookDetails);
    } catch (error) {
      console.error('Error fetching book details:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const bookArray = Object.values(books)
  const title = req.params.title;
  let filtered_books = bookArray.filter((book) => book.title === title);
  return res.send(filtered_books)
//   return res.status(300).json({message: "Yet to be implemented"});
});

// get all books bases on title using axios
app.get('/title/:title', async (req, res) => {
    try {
      const title = req.params.title;
  
      // Make a GET request to fetch all books based on title
      const response = await axios.get(`http://your-server-url/api/books/title/${title}`);
  
      // Assuming the book details are in the response.data
      const bookDetails = response.data;
  
      // Send the book details as a JSON response
      res.json(bookDetails);
    } catch (error) {
      console.error('Error fetching book details:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books = books[isbn];
  let reviews = filtered_books.reviews;
  return res.send(reviews)

//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
