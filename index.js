//DEPENDENCIES/NEEDS:
/*
    npm i -D nodemon
    npm install express
*/

const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log("Hey there")
})

