const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const app = express();
const { v4: uuidv4 } = require("uuid");
const router = require("./router");
const nocache = require("nocache");

const port = process.env.port || 3000;

app.set("view engine", "ejs");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Session middleware should be defined before the router middleware
app.use(nocache());

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

// Load static assets
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Use router middleware
app.use(router);

// Error route
app.use((req, res, next) => {
  res.render("error");
});

app.listen(port, () => {
  console.log("Listening to the server on http://localhost:3000");
});
