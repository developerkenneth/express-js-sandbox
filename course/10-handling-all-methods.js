const express = require("express");
const morgan = require("morgan");
const path = require('path');
const { readFileSync, writeFileSync } = require("fs");
const app = express();
const PORT = 3000;
// use express static method
app.use(express.static("./methods-public"));
const rawUsers = readFileSync("./data/users.json", "utf8");
const users = JSON.parse(rawUsers);




// handling all http request get, post, put, delete

app.use(express.json());
// using the urlencoded to get datas from url 
app.use(express.urlencoded({ extended: false }));

// handling get request for all users
app.get("/api/users", function (req, res) {
    res.status(200).json(users);

});

// create  a new user 
app.post("/api/users", function (req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            message: "all fields are required",
            status: 400
        });
        return;
    }

    const query = users.users.find((user) => user.email == email);
    if (query) {

        res.status(400).json({
            message: "email already exist",
            status: 400
        });
        return;
    }

    const id = users.users.length;

    users.users.push({
        id: id,
        username: name,
        email: email,
        password: password
    });

    writeFileSync("./data/users.json", JSON.stringify(users));

    res.status(201).json({
        message: "registration was successfully completed",
        status: 201,
        success: true
    })

    return;


});

// handle edit user: put request
app.put("/api/user/:id", function (req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json(
            {
                success: false,
                message: "please provide an id"
            }
        );
        process.exit(0);
    }
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "email and password fields are required"
        });
        process.exit(0);
    }

    const user = users.users.find(user => user.id == id);
    if (!user) {
        return res.status(400).json(
            {
                success: false,
                message: "user does not exist!"
            }
        );
        process.exit(0);
    }

    const updated = users.users.map((user) => {

        if (user.id == id) {
            user.name = name;
            user.email = email;
        }

        return user;
    });

    users.users = updated;
    const response = {
        success: true,
        message: "user details has been updated successfully",
        data: users
    };

    writeFileSync("./data/users.json", JSON.stringify(users));
    return res.status(201).json(response);
    process.exit(0);
});

// handle delete request for users
app.delete("/api/user/:id", function (req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "please provide the id of the user you want to delete"
        });
        process.exit();
    }

    const user = users.users.find(user => user.id == id);

    if (!user) {
        return res.status(400).json(
            {
                success: false,
                message: "user does not exist!"
            }
        );
        process.exit(0);
    }

    // deleting the user 
    const updatedUsers = users.users.filter((user) => user.id != id);

    const response = {
        success: true,
        message: "user has been deleted successfully.",
        data: id
    };

    users.users = updatedUsers;

    writeFileSync("./data/users.json", JSON.stringify(users));
    return res.status(201).json(response);
    process.exit(0);



})

// show registration form
app.get("/register", function (req, res) {
    const file = path.resolve(__dirname, "./methods-public/index.html");
    return res.sendFile(file);
})



app.listen(PORT, function () {
    console.log(`server is running on port:${PORT}`);
})