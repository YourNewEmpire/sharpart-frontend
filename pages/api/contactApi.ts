import type { NextApiRequest, NextApiResponse } from 'next'
let nodemailer = require('nodemailer')

const PASSWORD = process.env.MAIL_PW

export default async (req: NextApiRequest, res: NextApiResponse) => {
console.log('started contact api')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'contact.sharpart@gmail.com',
            pass: PASSWORD,
        },
        secure: true,
    })

    const mailData = {
        from: 'demo email',
        to: 'contact.sharpart@gmail.com',
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from:
      ${req.body.email}</p>`
    }

    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info)
    })
    res.status(200)
}