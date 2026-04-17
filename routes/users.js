const express = require("express");
const router = express.Router();

// requiring controllers
const { index, create, update, destroy } = require("../controllers/userController");


// handling get request for all users
router.get("/", index);

// create  a new user 
router.post("/", create);

// handle edit user: put request
router.put("/:id", update);

// handle delete request for users
router.delete("/:id", destroy);

module.exports = router;