const nodemailer = require("nodemailer");
require("dotenv").config();

const { PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "borline@meta.ua",
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);
// const emailOptions = {
//   to: "borline@meta.ua",
//   from: "borline@i.ua",
//   subject: "Nodemailer test",
//   html: "<p>Привет. Мы тестируем отправку писем!</p>",
// };
//

const nodeEmail = async (data) => {
  const email = { ...data, from: "borline@i.ua" };
  try {
    await transporter.sendMail(email);
    return true;
  } catch (e) {
    console.log("Ми отправили !");
  }
};

// transporter
//   .sendMail(emailOptions)
//   .then(() => console.log("Email send succes"))
//   .catch((error) => console.log(error.message));

//

module.exports = nodeEmail;
