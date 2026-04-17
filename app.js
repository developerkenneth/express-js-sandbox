const express = require("express");
const path = require('path');

const app = express();
const PORT = 3000;

const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");


// focusing on routing now
app.use(express.json());

// using the urlencoded to get datas from url 
app.use(express.urlencoded({ extended: false }));

// use express static method
// 1. Static files must be served from an absolute path
app.use(express.static(path.join(__dirname, 'methods-public')));


app.use("/", authRoute);
app.use("/api/users", usersRoute);




app.listen(PORT, function () {
    console.log(`server is running on port:${PORT}`);
})