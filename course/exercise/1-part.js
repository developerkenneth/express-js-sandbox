const express = require("express");
const app = express();
const PORT = 3000;
const auth = require("./middlewares/auth");

// activating dummy auth
app.use("/api/auth", auth);

const { users } = require("./data/datas");

app.get("/api/auth", function (req, res) {
    console.log(req.auth);
    res.json(req.auth);
})

app.listen(PORT, function () {
    console.log(`server is running on port:${PORT}`);
})