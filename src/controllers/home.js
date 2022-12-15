const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/informe", (req, res) => {
  res.render("form");
});
router.post("/save", (req, res) => {
  res.send("Informe guardado");
});
module.exports = router;
