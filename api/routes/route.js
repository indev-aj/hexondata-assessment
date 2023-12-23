// routes/other.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { connection } = require("../app");

// Login route
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  connection.getConnection( function (err, conn) {
    conn.query(
      "SELECT password FROM user WHERE username=?",
      [username],
      async (err, results, field) => {
        if (err) {
          console.log(err);
          res.json({ success: false });
          return;
        }
        if (!results.length) {
          console.log("no user found");
          res.json({ success: false });
          return;
        }

        const hashedPassword = results[0]["password"];
        const isValid = await bcrypt.compare(password, hashedPassword);
        if (isValid) {
            console.log("got in");
          res.status(201).json({ success: true });
        } else {
            console.log("password mismatch");
            res.status(201).json({ success: false });
        }
      }
    );
  });
});

// User registration
router.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  connection.getConnection(function (err, conn) {
    conn.query(
      "INSERT INTO user (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      function (err, rows) {
        if (err) {
          console.log(err);
        }

        res.status(201).json({ success: true });
      }
    );
  });
});

// Add more routes as needed

module.exports = router;
