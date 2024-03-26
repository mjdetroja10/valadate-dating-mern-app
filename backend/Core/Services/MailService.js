const nodemailer = require("nodemailer");

const path = require("path");
const ejs = require("ejs");
const chalk = require("chalk");

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_EMAIL, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

class MailService {
  static async send(data) {
    let sendData = { from: MAIL_EMAIL, to: "", subject: "", text: "", html: "" };

    if (!data.to || !data.subject || !data.html) return false;

    if (data?.from) sendData.from = data.from;

    sendData.to = data.to;
    sendData.subject = data.subject;
    sendData.html = await ejs.renderFile(path.join(__dirname + "/../../Http/views/email.ejs"), data.html);
    let info = false;

    try {
      info = await transporter.sendMail(sendData);
    } catch (error) {
      console.log(chalk.bgRed("mail error :", error));
    }

    if (info) return true;
    return false;
  }
}

module.exports = MailService;
