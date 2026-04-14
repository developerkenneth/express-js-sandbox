const express = require("express");

// focus on getting query strings 
const { products } = require("./data/datas");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {

    res.json(products);

})
app.get("/products/:productID", function (req, res) {


    const productId = parseInt(req.params.productID);
    const singleProduct = products.find(product => product.id == productId);

    // checking if the product exist or not

    if (!singleProduct) {
        res.status(404).send("<h1>Page not found </h1>");
        return;
    }

    res.json(singleProduct);
    return;
});


// getting query strings  eg ?q=hello world

app.get("/search", (req, res)=>{
    console.log(req.query);
    res.send(`<h1>You search for "${req.query.query}"</h1>`);
    return;
});
app.all(/.*/, (req, res) => {
    res.status(404).send("<h1>404</h1><p>page not found</p>");
});

app.listen(PORT, () => {
    console.log(`express running on ${PORT}`);
})