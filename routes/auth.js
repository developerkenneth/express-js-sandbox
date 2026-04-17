const express = require("express");
const router = express.Router();
const path = require('path');

// Use path.join for better cross-platform compatibility
// __dirname is the current folder (routes), so '..' goes up to the root
const publicPath = path.join(__dirname, '..', 'methods-public');

router.get("/register", (req, res) => {
    // path.join is safer than path.resolve for joining segments
    res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = router;