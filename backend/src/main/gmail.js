// npm install nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'retreatbookroommail@gmail.com', // 例如：myemail@gmail.com
    pass: 'kionndpschftgxoo' // 沒有空格，直接貼
  }
});

const mailOptions = {
  from: '棲遲書屋 <retreatbookroommail@gmail.com>',
  to: '收件者@example.com',
  subject: '【棲遲書屋】電子郵箱驗證信',
  text: `
    您好，

    感謝您註冊棲遲書屋！

    請點擊以下連結完成您的電子郵箱驗證：

    https://yourdomain.com/verify-email?token=YOUR_VERIFICATION_TOKEN

    若無法點擊，請將上面的網址複製並貼到瀏覽器中。

    如果您沒有申請此郵件，請忽略此信件。

    謝謝您！

    棲遲書屋團隊`,

  html: `
    <p>您好，</p>
    <p>感謝您註冊棲遲書屋！</p>
    <p>請點擊以下連結完成您的電子郵箱驗證：</p>
    <p><a href="https://yourdomain.com/verify-email?token=YOUR_VERIFICATION_TOKEN" target="_blank" rel="noopener noreferrer">
      點此驗證電子郵箱
    </a></p>
    <p>若無法點擊，請將上面的網址複製並貼到瀏覽器中。</p>
    <p>如果您沒有申請此郵件，請忽略此信件。</p>
    <br/>
    <p>謝謝您！</p>
    <p>棲遲書屋團隊</p>
  `,
};


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('錯誤:', error);
  }
  console.log('信件已寄出:', info.response);
});
