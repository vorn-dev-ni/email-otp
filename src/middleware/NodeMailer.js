import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export const sendEmail = (option) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    host: process.env.EMAIL_GMAIL_PORT,
    port: process.env.EMAIL_GMAIL_HOST,
  });

  const htmlFilePath = path.join(__dirname, "..", "views", "index.html");

  fs.readFile(htmlFilePath, "utf8", (err, htmlContent) => {
    if (err) {
      console.error("Error reading HTML file:", err);
      return;
    }

    const emailOption = {
      from: "Siv Sovanpanhavorn <Nightpp19@gmail.com>", // sender address
      to: option.email, // list of receivers
      subject: "OTP Email code", // Subject line
      text: "Please verify your code", // plain text body
      html: `<h3>Verify OTP</h3>
        <p>Here is your code: </p>
        <h3>${option.codes}</h3>`, // html body from the file
    };

    transporter
      .sendMail(emailOption)
      .then(() => {
        console.log("Success Email sending");
      })
      .catch((err) => {
        throw new Error(err);
      });
    // Now you can use emailOption to send your email
  });
};
