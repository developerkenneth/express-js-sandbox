const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

// using external middlewares like morgan
app.use(morgan("tiny"));

app.get("/", function (req, res) {
    console.log(req.auth);
    res.json(req.auth);
})

app.listen(PORT, function () {
    console.log(`server is running on port:${PORT}`);
})