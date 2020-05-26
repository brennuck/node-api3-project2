// code away!
const server = require('./server.js');

require('dotenv').config();

const port = process.env.PORT || 1234;
server.listen(port, () => {
    console.log(`\n* Server Running on ${port} *\n`);
}); 