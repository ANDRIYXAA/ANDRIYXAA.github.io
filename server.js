const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Ініціалізація списку користувачів
let users = [];

// Завантаження користувачів з файлу (якщо файл існує)
if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
}

// Налаштування Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

// Реєстрація користувача
app.post('/register', (req, res) => {
    const email = req.body.email;

    if (users.includes(email)) {
        return res.send({ success: false, message: 'Користувач вже зареєстрований' });
    }

    users.push(email);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.send({ success: true, message: 'Користувач успішно зареєстрований' });
});

// Відправка повідомлення електронною поштою
app.post('/send-email', (req, res) => {
    const message = req.body.message;

    users.forEach((email) => {
        let mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Нове замовлення',
            text: message,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

    res.send({ success: true, message: 'Повідомлення успішно відправлено' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
