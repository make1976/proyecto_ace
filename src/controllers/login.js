const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();
const db = require("../config/db");
const Mail = require("../lib/Mail");
const prPool = db.promise();

router.get("/", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("registro");
});
router.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const query = `select * from main_user where email=?`;
  const [rows, fields] = await prPool.execute(query, [email]);
  if (!rows.length) return res.send("Usuario o contraseña incorrecta");
  const user = rows.shift();
  if (await bcrypt.compare(pass, user.password)) return res.send("Usuario o contraseña incorrecta");
  res.redirect("/home");
});
router.post("/register", async (req, res) => {
  const { password, email: e_mail, name } = req.body;
  delete req.body.password;
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  const saveData = [
    ...Object.values(req.body),
    1,
    pass
  ];
  const query = `insert into main_user (name, last_name, email, rol_id, password) values(?,?,?,?,?)`;
  const response = await prPool.execute(query, [...saveData]);
  const email = new Mail;
  console.log(e_mail);
  email.sendEMail({
    to: e_mail,
    from: process.env.MAIL_SYSTEM,
    subject: "Registro Exitoso"
  }, "register.ejs", () => {
    console.log("correo enviado");
    return res.send("Registro exitoso");
  }, {
    name
  })
});

module.exports = router;
