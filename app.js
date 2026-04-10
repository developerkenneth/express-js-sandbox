const express = require("express");
const app = express();
const {products} = require("./data/datas.js");


const PORT = 3000;


app.get("/", function(req, res){
    res.json(products);
});

// for 404
app.all(/.*/, function(req, res){
    res.status(404).send("404: page not found");
});
//setting port
app.listen(PORT, function(){
  console.log(`server running on ${PORT}`);
}) ;

