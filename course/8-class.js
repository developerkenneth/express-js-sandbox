const express = require("express");

// using a middleware from an external class and also applying a middleware using the use method:
const {testMiddleware,apiMiddlewares} = require("./middlewares/testMiddleware");
const {products} = require("./data/datas");

const app = express();
const PORT = 3000;



app.use(testMiddleware);

// applying a middleware to the routes with /api
app.use("/api", apiMiddlewares);

app.get("/", function(req, res){
        res.send("Home page");
})

app.get("/api/products", function(req, res){
        res.json(products);
})



app.listen(PORT, () => {
    console.log(`express running on ${PORT}`);
})