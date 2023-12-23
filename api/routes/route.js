// routes/other.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { connection } = require("../app");

// Login route
router.post("/api/login", async (req, res) => {
  console.log("Heloo from backend");
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({ username: username, password: hashedPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User registration
router.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  connection.getConnection(function(err, conn) {
    conn.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, hashedPassword], function(err, rows) {
        if (err) {
            console.log(err);
        }
        
        res.status(201).json({success: true});
    });
  });
});

// Add more routes as needed

module.exports = router;
