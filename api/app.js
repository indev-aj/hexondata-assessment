// import libraries
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

dotenv.config({ path: "./.env" });

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// connection.connect((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Database connected!");
//   }
// });

module.exports = {
  app,
  connection,
};

const routes = require("./routes/route");
app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);

app.listen(5001, () => {
  console.log("Listening on port 5001");
});
