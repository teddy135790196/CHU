// npm install nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kang900320@gmail.com', // 例如：myemail@gmail.com
    pass: 'lxzvkjowylxysynt' // 沒有空格，直接貼
  }
});

const mailOptions = {
  from: '你的名字 <kang900320@gmail.com>',
  to: 'kang900320@gmail.com',
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


// 兩步驟驗證一定要開啟

// 這16位密碼只會出現這一次，之後怎麼樣都無法再次用出來