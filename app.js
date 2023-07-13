const express = require("express");

const app = express();


const nodemailer = require("nodemailer");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.get("/", (req, res) => {});
app.post("/contact_us", (req, res) => {
  // console.log(req);

  const transporter = nodemailer.createTransport({
    // to send the mail
    service: "gmail",
    auth: {
      user: "nodemailer1998@gmail.com",
      pass: "lasansfshfppqpco",
    },
  });

  const { name , email, phone, subject, message } = req.body;
  
  const emailBody = `
A contact form was recently submitted on StreamTech website. Below are the details of the inquiry

Name: ${name}
Email: ${email}
Phone Number: ${phone}
Subject: ${subject}
Message: ${message}
  `;

  const mailoption = {
    // fetches the form data
    from: name,
    to: "bansal.gajjar99@gmail.com",
    subject: `Contact form filled out on StreamTech - ${name} ${email}`,
    text: emailBody,
  };

  transporter.sendMail(mailoption, (error, info) => {
    //sendmail will send the mail
    if (error) {
      // console.log(error);
      res.status(500).json({message:"Problem with sending email"})
    } else {
      // console.log("Email sent :" + info.response);
      res.json({success:true})
    }
  });
});

app.listen(3000, () => {
  console.log("server is started");
});
