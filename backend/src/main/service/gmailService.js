// src/main/service/gmailService.js

// npm install nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '你的 Gmail 帳號', // 例如：myemail@gmail.com
    pass: '你剛剛產生的 16 位應用程式密碼' // 沒有空格，直接貼
  }
});

const mailOptions = {
  from: '你的名字 <你的 Gmail>',
  to: '收件者@example.com',
  subject: '驗證信',
  text: '這是一封驗證信',
  html: '<p>這是一封 <b>驗證信</b></p>'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('錯誤:', error);
  }
  console.log('信件已寄出:', info.response);
});
