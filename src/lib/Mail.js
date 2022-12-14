const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
module.exports = class Mail {
    constructor() {
        this.settings;
        this.transporter = nodemailer.createTransport;
        this.settings = {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            }
        }
    }
    sendEMail(data, template, success, vars = {}) {
        const Mvars = {
            APP_NAME: process.env.APP_NAME,
            YEAR: new Date().getFullYear(),
        };
        ejs.renderFile(path.join(__dirname, '../views/mail_templates/', template),
            {
                ...Mvars,
                ...vars,
            }, (err, str) => {
                if (!err) {
                    this.transporter(this.settings).sendMail({
                        from: `${process.env.APP_NAME} <${process.env.MAIL_SYSTEM}>`,
                        to: data.to,
                        subject: data.subject,
                        //text: "Hola, este es un correo de prueba"
                        html: str
                    }, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            success()
                        }
                    });
                }else{
                    console.log(err);
                }
            });

    }

}