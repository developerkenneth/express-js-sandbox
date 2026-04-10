const express = require("express");
const path = require("path");
const app = express();

// getting all resources
app.use(express.static("./public"));
// port
const PORT = 3000;


// displaying files on browser
app.get("/", function(req, res){
  const file = path.resolve(__dirname, "./app/index.html");

  res.status(200).sendFile(file);
})

// for 404
app.all(/.*/, function(req, res){
    res.status(404).send("404: page not found");
});
//setting port
app.listen(PORT, function(){
  console.log(`server running on ${PORT}`);
}) ;