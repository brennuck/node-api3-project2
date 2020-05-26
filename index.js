// code away!
const server = require('./server.js');

const port = process.env.PORT || 1234;
server.listen(port, () => {
    console.log(`\n* Server Running on ${port} *\n`);
}); 