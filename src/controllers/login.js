const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("registro");
});

module.exports = router;
