const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'danailtodorov440@gmail.com',
        pass: 'tuyk sgfa icqy kmqu'
    }
});

