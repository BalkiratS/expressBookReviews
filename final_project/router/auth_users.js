const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 600 * 600 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.session.authorization['username'];
  let book = books[req.params.isbn]
  const reviewText = req.query.review;
  
  let reviews = book.reviews;
  
   // Check if the user already has a review for this book
   const existingReviewIndex = reviews.findIndex(review => review.username === username);

   if (existingReviewIndex !== -1) {
     // Update the existing review
     reviews[existingReviewIndex].review = reviewText;
   } else {
     // Add a new review
     reviews.push({ "username": username, "review": reviewText });
   }
   return res.send("The review was submitted successfully");
 });

 regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.session.authorization['username'];
    let book = books[req.params.isbn]
  
    let reviews = book.reviews;
  
   // Check if the user has a review for this book
   const existingReviewIndex = reviews.findIndex(review => review.username === username);

   if (existingReviewIndex !== -1) {
     // Delete the review
     book.reviews.splice(existingReviewIndex, 1);
   } else {
     // tell user they do not have any review
     reviews.push({ "username": username, "review": reviewText });
   }
   return res.send("The review was deleted successfully");
 })

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
