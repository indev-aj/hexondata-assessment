// routes/other.js
const express = require("express");
const bcrypt = require("bcrypt");
const { connection } = require("../app");

const router = express.Router();

router.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// Login route
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  connection.getConnection(function (err, conn) {
    conn.query(
      "SELECT * FROM user WHERE username=?",
      [username],
      async (err, results, field) => {
        conn.release();

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

        // If credential is valid then navigate to maplocator
        if (isValid) {
          req.session.user = results[0];
          console.log(req.session.user);

          res.status(201).json({ success: true });
        } else {
          res.status(401).json({ success: false, reason: "Wrong password" });
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
      conn.release();
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
            conn.release();

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
    conn.query("SELECT * FROM markers", async (err, results, field) => {
      conn.release();

      if (err) {
        console.log(err);
        res.json({ success: false, error: err });
        return;
      }

      res.status(201).json({ success: true, markers: results });
    });
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
        conn.release();

        if (err) {
          console.log(err);
          res.json({ success: false, error: err });
          return;
        }

        res.status(201).json({ success: true });
      }
    );
  });
});

router.post("/api/logout", (req, res) => {
  // Destroy the session on the server
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }

    // Respond with a success message
    res.clearCookie("userId"); // Clear the session cookie on the client side
    res.status(200).json({ success: true });
  });
});

module.exports = router;
