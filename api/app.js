// import libraries
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");


dotenv.config({ path: "./.env" });

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database connected!");
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());


// Login route
app.post("/api/login", async (req, res) => {
  console.log("Heloo from backend");
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({ username: username, password: hashedPassword });
    // const result = await connection.query(
    //   "INSERT INTO users (username, password) VALUES (?, ?)",
    //   [username, hashedPassword]
    // );
    // res
    //   .status(201)
    //   .json({
    //     message: "User registered successfully",
    //     userId: result.insertId,
    //   });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5001, () => {
  console.log("Listening on port 5001");
});
