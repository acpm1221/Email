const express = require('express');

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Directory for static files like HTML

// Route for handling form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-password' // Your password
        }
    });

    // Email content
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient@example.com',
        subject: `Message from ${name} (${email})`,
        text: message
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error: Something went wrong. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
