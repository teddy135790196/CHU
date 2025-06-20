// backend/src/main/service/emailVerificationService.js

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const emailVerificationModel = require('../model/emailVerificationModel');
require('dotenv').config({ path: '../../../.env' });

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

transporter.verify((err) => {
	if (err) {
		console.error('SMTP transporter 驗證失敗:', err);
	} else {
		console.log('✅ SMTP transporter 已就緒');
	}
});

function sendMail(toEmail, token) {
	const baseUrl = process.env.APP_BASE_URL;
	const verificationUrl = `${baseUrl}/api/email-verification/verify?token=${token}`;

	// ✅ Debug log
	console.log('📦 .env APP_BASE_URL:', baseUrl);
	console.log('📧 寄信目標:', toEmail);
	console.log('🔗 驗證連結:', verificationUrl);

	const mailOptions = {
		from: `棲遲書屋 <${process.env.GMAIL_USER}>`,
		to: toEmail,
		subject: '【棲遲書屋】電子郵箱驗證信',
		text: `
			您好，

			您於個人頁面請求驗證電子郵箱，請點擊以下連結完成驗證：

			${verificationUrl}

			如果您沒有申請此郵件，請忽略此信件。

			謝謝您！

			棲遲書屋團隊
		`,

		html: `
			<p>您好，</p>
			<p>您於個人頁面請求驗證電子郵箱，請點擊以下連結完成驗證：</p>
			<p><a href="${verificationUrl}" target="_blank" rel="noopener noreferrer">
				點此驗證電子郵箱
			</a></p>
			<p>如果您沒有申請此郵件，請忽略此信件。</p>
			<br/>
			<p>謝謝您！</p>
			<p>棲遲書屋團隊</p>
		`,
	};

	return transporter.sendMail(mailOptions);
}

function sendVerificationEmail(toEmail) {
	return new Promise((resolve, reject) => {
		emailVerificationModel.findUserByEmail(toEmail, (err, user) => {
			if (err) return reject(err);
			if (!user) return reject(new Error('找不到使用者'));

			const token = crypto.randomBytes(32).toString('hex');
			const expires = new Date(Date.now() + 5 * 60 * 1000); // 驗證碼 5分鐘 有效

			emailVerificationModel.updateUserVerificationToken(user.user_id, token, expires, (err) => {
				if (err) return reject(err);

				sendMail(toEmail, token)
					.then(info => resolve('驗證信已寄出'))
					.catch(mailErr => reject(mailErr));
			});
		});
	});
}

function verifyEmail(token) {
	return new Promise((resolve, reject) => {
		emailVerificationModel.findUserByToken(token, (err, user) => {
			if (err) return reject(err);
			if (!user) return reject(new Error('驗證連結無效或已過期'));

			emailVerificationModel.verifyUserEmail(token, (err) => {
				if (err) return reject(err);
				resolve('驗證成功，感謝您！');
			});
		});
	});
}

module.exports = {
	sendVerificationEmail,
	verifyEmail,
};
