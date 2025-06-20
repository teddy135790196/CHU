// backend/src/main/service/gmailService.js

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	}
});

// 加入這段驗證 SMTP 連線是否成功
transporter.verify((err, success) => {
	if (err) {
		console.error('Transporter 驗證失敗：', err);
	} else {
		console.log('✅ SMTP transporter 已就緒');
	}
});

exports.sendVerificationEmail = async (toEmail, token = 'sample_token') => {
	const verificationUrl = `https://yourdomain.com/verify-email?token=${token}`;

	const mailOptions = {
		from: `棲遲書屋 <${process.env.GMAIL_USER}>`,
		to: toEmail,
		subject: '【棲遲書屋】電子郵箱驗證信',
		text: `
      您好，

      感謝您註冊棲遲書屋！

      請點擊以下連結完成您的電子郵箱驗證：

      ${verificationUrl}

      若無法點擊，請將上面的網址複製並貼到瀏覽器中。

      如果您沒有申請此郵件，請忽略此信件。

      謝謝您！

      棲遲書屋團隊
    `,
		html: `
      <p>您好，</p>
      <p>感謝您註冊棲遲書屋！</p>
      <p>請點擊以下連結完成您的電子郵箱驗證：</p>
      <p><a href="${verificationUrl}" target="_blank" rel="noopener noreferrer">
        點此驗證電子郵箱
      </a></p>
      <p>若無法點擊，請將上面的網址複製並貼到瀏覽器中。</p>
      <p>如果您沒有申請此郵件，請忽略此信件。</p>
      <br/>
      <p>謝謝您！</p>
      <p>棲遲書屋團隊</p>
    `,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log('✅ 郵件寄出成功，messageId:', info.messageId);
		return info;
	} catch (err) {
		console.error('❌ 寄郵件時發生錯誤：', err);
		throw err;
	}

	// ✅ 寄出信件（放在 function 裡）
	// await transporter.sendMail(mailOptions);
};
