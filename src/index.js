const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN
let smtp_password = process.env.SMTP_PASSWORD

let transporter = nodemailer.createTransport({
    // host: "smpt.ethereal.email",
    service: "gmail",
    // port: 25,
    // requireTLS: true,
    // secure: false,
    auth: {
        user: smtp_login,
        pass: smtp_password
    }
    , tls: {
        rejectUnauthorized: false
    }
})

app.get('/', function (req, res) {
    res.send('server working')
});

app.get('/test', function (req, res) {
    res.send('server working TEST')
})

app.post('/sendMessage', async function (req, res) {
    const {email, text, name} = req.body;
    try {
        const info = await transporter.sendMail({
            from: 'GO TO JOB',
            to: 'gilmanov.dev@gmail.com',
            subject: 'тестовое сообщение',
            html: `<b>сообщение с вашего портфолио</b>
            <div>${name}</div>
            <div>${email}</div>
            <div>${text}</div>
            `
        });
        // console.log('Email sent:', info.response, req.body);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
})

let port = process.env.PORT || 3003

app.listen(port, function () {
    console.log("Example app listening on port 3003!")
})

