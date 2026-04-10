const express = require("express");
const app = express();
const PORT = 3000;


// home page
app.get("/", function(req, res){
    res.send("<h1>Home Page </h1>");
});


// about page
app.get("/about", function(req, res){
    res.send("<h1>About Page</h1>");
});


// for pages that is not found
app.all(/.*/, function(req,  res){
    res.status(404).send(`<h1>404</h1>
      <p>Page not found </p>
      `)
});

app.listen(PORT, function(){
  console.log(`Server is running on ${PORT}`);
})

