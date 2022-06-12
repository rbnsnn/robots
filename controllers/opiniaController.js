//Pacza pozwalająca na wysyłąnie maili
const nodemailer = require('nodemailer');

//Funkcja wyświetlająca /opinia
const getOpinia = (req, res) => {
    res.render('layouts/opinia', { layout: 'index' })
}

//Funkcja obsługująca wysłanie maila
const postOpinia = async (req, res) => {
    //Definiujemy transporter a w nim ustawienia poczty przez którą ma być wysłany mail
    const transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'robotytest@hotmail.com',
            pass: 'Robo!234'
        }
    })

    //Ustawienia wysyłania na podstawie przekazanych parametrów - tym razem w req.body a nie w url z ../public/javascripts/validate
    const mailOptions = {
        from: 'robotytest@hotmail.com',
        to: req.body.email,
        subject: `Opinia: ${req.body.name}`,
        text: req.body.message
    }
    //Wysłanie maili i obsługa błędów
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Concurent connections limit exceed');
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

    //Wyrenderowanie opini z potwierdzeniem wysłania
    res.render('layouts/opinia', { sended: true })
}

module.exports = { getOpinia, postOpinia }