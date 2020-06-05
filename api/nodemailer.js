async function mailer(counter,email) {
    const nodeMailer = require('nodemailer');

    try {
        let transporter = nodeMailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: 'testsysten@mail.ru',
                pass: 'Nodemailer'
            }
        });

        let info = await transporter.sendMail({
            from: 'English test <testsysten@mail.ru>',
            to: email,
            subject: 'Congratulations!',
            text: `Congratulations!
            You are successfully pass our test!
            Your result is:  ${counter} %
            You shouldn't answer to this question.
            `
        }, (err, info) =>  {
            if(err) return console.log(err);
            console.log('Email sent!');
        });
    } catch (e) {
        console.log(e.name);
    }
}

module.exports = mailer;


// const nodemailer = require('nodemailer');
//
// const transporter = nodemailer.createTransport(
//     {
//         host: 'smtp.mail.ru',
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'testsysten@mail.ru',
//             pass: 'Nodemailer'
//         }
//     },
//     {
//         from: 'English Test <testsysten@mail.ru>',
//     }
// );
//
// const mailer = message => {
//     transporter.sendMail(message, (err, info) => {
//         if(err) return console.log(err);
//         console.log('Email sent: ', info)
//     })
// };
//
// module.exports = mailer;
