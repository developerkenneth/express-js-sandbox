// more on query string
const express = require("express");

// focus on getting query strings 
// built a system that allows limit
const { products } = require("./data/datas");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {

    res.json(products);

});


// getting query strings  eg ?query=hello world

app.get("/products/search", (req, res) => {

    let searchProducts = [...products];
    const { query, limit } = req.query;
    if (query) {
        searchProducts = searchProducts.filter((product) => {
            return product.product_name.toLowerCase().includes(query.toLowerCase());
        });
    }

    if(limit){
        searchProducts = searchProducts.slice(0, Number(limit));
    }

    let message = "";

    if (searchProducts.length < 1) {
        message = "no search found, result 0";
    } else {
        message = `search was found, result ${searchProducts.length}`;
    }
    let result = {
        message: message,
        query: query,
        products: searchProducts,
    }
    res.status(200).json(result);
    return;
});

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





app.all(/.*/, (req, res) => {
    res.status(404).send("<h1>404</h1><p>page not found</p>");
});

app.listen(PORT, () => {
    console.log(`express running on ${PORT}`);
})