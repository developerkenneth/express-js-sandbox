const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "/data/users.json");
const rawUsers = readFileSync(dataPath, "utf8");
const users = JSON.parse(rawUsers);



function index(req, res) {
    res.status(200).json(users);
}

function create(req, res) {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            message: "all fields are required",
            status: 400
        });
        return;
        process.exit(0);
    }

    const query = users.users.find((user) => user.email == email);
    if (query) {

        res.status(400).json({
            message: "email already exist",
            status: 400
        });
        return;
        process.exit(0);
    }

    const id = users.users.length;

    users.users.push({
        id: id,
        username: name,
        email: email,
        password: password
    });

    writeFileSync(dataPath, JSON.stringify(users));

    res.status(201).json({
        message: "registration was successfully completed",
        status: 201,
        success: true
    })

    process.exit(0);
    return;


}


function update(req, res) {
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

    writeFileSync(dataPath, JSON.stringify(users));
    return res.status(201).json(response);
    process.exit(0);
}


function destroy(req, res) {
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

    writeFileSync(dataPath, JSON.stringify(users));
    return res.status(201).json(response);
    process.exit(0);

}

module.exports = {
    index,
    create,
    update,
    destroy
};