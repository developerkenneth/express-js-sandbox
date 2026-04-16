
const { users } = require("../data/datas");

function auth(req, res, next) {
    const { username } = req.query;
    if (username) {
        const auth = users.find((user) => user.username == username);
        req.auth = auth;
        next();
    } else {
        res.status(401).json({
            message: "aunthentication failed",
            status: 401
        })
    }

    next();
}

module.exports = auth;