const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//
const connectDatabase = require("./config/db.config");
dotenv.config();

const app = express();
connectDatabase.connectDatabase();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
