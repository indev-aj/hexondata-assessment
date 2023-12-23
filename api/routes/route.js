// routes/other.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { connection } = require("../app");

// Login route
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  connection.getConnection(function (err, conn) {
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
    if (err) {
      console.error("Error acquiring connection:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    conn.query(
      "SELECT COUNT(*) AS count FROM user WHERE username = ?",
      [username],
      function (err, result) {
        if (err) {
          console.error("Error checking username existence:", err);
          conn.release(); // Release the connection in case of an error
          return res
            .status(500)
            .json({ success: false, error: "Internal Server Error" });
        }

        const usernameExists = result[0].count > 0;

        if (usernameExists) {
          console.log("Username already exists");
          conn.release(); // Release the connection before responding
          return res
            .status(409)
            .json({ success: false, error: "Username already exists" });
        }

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
      }
    );
  });
});

// Select markers from DB
router.get("/api/get/markers", async (req, res) => {
  connection.getConnection(function (err, conn) {
    conn.query(
      "SELECT * FROM markers",
      async (err, results, field) => {
        if (err) {
          console.log(err);
          res.json({ success: false, error: err});
          return;
        }

        res.status(201).json({ success: true, markers: results });
      }
    );
  });
});

// Add markers
router.post("/api/markers", async (req, res) => {
    const { name, desc, lat, long } = req.body;
  
    connection.getConnection(function (err, conn) {
      conn.query(
        "INSERT INTO markers (name, description, latitude, longitude) VALUES (?, ?, ?, ?)",
        [name, desc, lat, long],
        async (err, results, field) => {
          if (err) {
            console.log(err);
            res.json({ success: false, error: err});
            return;
          }
  
          res.status(201).json({ success: true });
        }
      );
    });
  });

module.exports = router;
