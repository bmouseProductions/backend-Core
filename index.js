const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors");

const port = 4000;

app.use(express.json());
app.use(cors());

async function sentEmailBackend(name, email, area, phone, phoneDDD, message) {
  try {
    let transporter = nodemailer.createTransport(
      smtpTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "benolopesdias@gmail.com",
          pass: "zhym kbuv wltg xalo",
        },
      })
    );

    let info = await transporter.sendMail({
      from: "contas@bmouseproductions.com",
      to: ["benolopesdias@gmail.com"],
      subject: "Message from Landing Page",
      html: `<p> Name: ${name}</p>
                  <p> Email: ${email}</p>
                  <p> Phone: ${phone} </p>
                  <p> Area: ${area} </p>
                  <p> Message: ${message} </p>
                  `,
    });
  } catch (err) {
    console.error(err);
  }
}

app.post("/send-email", async (req, res) => {
  const { name, email, area, phone, phoneDDD, message } = req.body;

  try {
    await sentEmailBackend(name, email, area, phone, phoneDDD, message);
    res.status(200);
    res.end();
  } catch (error) {
    console.error("Error to send any email", error);
    res.status(500).json({ message: "Error to send any email" });
    res.end();
  }
});

app.listen(port, () => {
  console.info(`${port}`);
});
