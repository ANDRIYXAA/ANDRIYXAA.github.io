const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // де знаходиться ваш index.html та інші файли

// Налаштування Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

app.post('/send-email', (req, res) => {
    const message = req.body.message;

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',
        subject: 'Нове замовлення',
        text: message,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send({ success: false, message: 'Помилка при відправці електронного листа' });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ success: true, message: 'Повідомлення успішно відправлено' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
