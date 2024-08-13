/* eslint-disable no-console */
import cron from 'node-cron'
import nodemailer from 'nodemailer';
import { Document } from './app/Modules/Documents/Document.model';
import { User } from './app/Modules/User/User.model';


async function sendExpiryEmails() {
  try {
    const expiredDocuments = await Document.find({
      dateOfExpiry: { $lte: new Date() }
    });

    if (expiredDocuments.length > 0) {
      const users = await User.find();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      users.forEach(user => {
        const emailBody = `The following documents have expired:\n${expiredDocuments.map(doc => `${doc.type} - "${doc.vehicle}"`).join("\n")}`;

        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Documents Expired',
          text: emailBody
        }, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      });
    }
  } catch (error) {
    console.error('Error in sending expiry emails:', error);
  }
}

//midnight every day
cron.schedule('0 0 * * *', sendExpiryEmails);
// cron.schedule('*/5 * * * *', sendExpiryEmails);
