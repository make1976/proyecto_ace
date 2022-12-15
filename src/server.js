const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

//const session = require('express-session');
//const db = require("./config/conection");
const cors = require('cors');
//const { createToken, hashPassword, verifyPassword } = helpers;

//Add controllers
const Login = require('./controllers/login');
const Home = require('./controllers/home');
//import Base from '../../src/client/components/Base';
//var Language = helpers.Language;
const app = express();
//app.use(cors());
const corsConfig = {
   origin: true,
   credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.set("port", process.env.PORT || 3001);
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));
//Ajustes de variables de entorno
app.use('/public', express.static(path.join(__dirname, "../public")));
app.use(`/login`, Login);
app.use(`/home`, Home);
app.get("/", (req, res) => {
   res.redirect("/login");
});
module.exports = app;