var express = require("express");
var router = express.Router();

const credential = {
  email: "admin@gmail.com",
  password: "123",
};

router.get("/", (req, res) => {
  if (req.session.user) {
    res.render("welcome", { user: req.session.user, watchData });
  } else {
    res.render("index");
  }
});

router.get("/Tologin", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/");
  } else {
    res.render("login", { msg: "Invalid Entry" });
  }
});

//route for logout
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.render("index", { title: "Express", logout: "Logout Successfully" });
});

const watchData = [
  {
    title: "SAMSUNG",
    price: 18000,
    des: "SAMSUNG Galaxy Watch 5",
    img: "./assets/1.png",
  },
  {
    title: "Fitbit",
    price: 17000,
    des: "Fitbit Versa 2 Health and Fitness",
    img: "./assets/4.png",
  },
  {
    title: "Apple",
    price: 16000,
    des: "Apple Watch Series 5 ",
    img: "./assets/2.png",
  },
  {
    title: "Garmin",
    price: 12000,
    des: "Garmin Lily™, Small GPS Smartwatch",
    img: "./assets/3.png",
  },
];

module.exports = router;
