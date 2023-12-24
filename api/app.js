// import libraries
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

dotenv.config({ path: "./.env" });

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

module.exports = {
  app,
  connection,
};

app.use(session({
  key: "userId",
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24,
  }
}));

const routes = require("./routes/route");

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());


app.use("/", routes);

app.listen(5001, () => {
  console.log("Listening on port 5001");
});
