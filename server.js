const express = require('express');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(express.json());

function logger(req, res, next) {
  console.log(`Request Method: ${req.method}, Request Url: ${req.originalUrl}, TimeStamp: ${new Date().getDate()}`)
  
  next();
}

module.exports = server;
