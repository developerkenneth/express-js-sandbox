// focus is on middleware 

const express = require("express");
const { json } = require("node:stream/consumers");

// introduction to node js middleware.

const app = express();
const PORT = 3000;

const testMiddleware = (req, res, next) =>{

    const date = new Date().getFullYear();
    const url = req.url;
    const method = req.method;

    console.log(date, url, method);

    // send back response from the middleware:
    // res.send("Hello world");

    // passing it to the next function (middleware)
    next();
}
app.get("/", testMiddleware, function(req, res){
        res.send("Home page");
})
app.listen(PORT, () => {
    console.log(`express running on ${PORT}`);
})