const http= require('http');
const app= require('./index.js');

const port= process.env.PORT || 3000;

const server= http.createServer(app);

server.listen(port, ()=> {
    console.log("Servers started successfully");
});