const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const bcrypt = require('bcrypt');

const User = require('./models/User.js');

const nodemailer = require('nodemailer'); // for sending emails

const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true
}));


app.use("/front_end", express.static(path.join(__dirname, '../front_end')));
app.use("/music_sounds", express.static(path.join(__dirname, '../music_sounds')));

app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

mongoose.connect('mongodb://localhost:27017/piano_users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log('Connected to MongoDB');
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jordan.radanov94@gmail.com',
        pass: 'tuyk sgfa icqy kmqu'
    }
});

app.post('/login', async (req, res) => {
    const { username,  password } = req.body;

    try {
        const user = await User.findOne({ username });

        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: "The user was not found!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        req.session.userId = user._id;

        return res.status(200).json({success: true});        
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});