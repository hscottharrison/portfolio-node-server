const express = require("express");
const cors = require("cors");
const sgMail = require('@sendgrid/mail')
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/mailer', (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  console.log('KEY', process.env.SENDGRID_API_KEY);
  const msg = {
    from: 'hunter@codadevelopment.net',
    to: 'hunter@codadevelopment.net',
    subject: 'NEW SUBMISSION FROM WEBSITE',
    html: `${req.body.name} <br/> ${req.body.email} <br/> ${req.body.phone} <br /> ${req.body.message} `
  }
  sgMail.send(msg)
  .then(() => {
    res.status(200);
    res.end()
  })
  .catch((error) => {
    res.status(500);
    res.end();
  })
});

let port = process.env.PORT;
if (!port) {
  port = 3000;
}

app.listen(port);