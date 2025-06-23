// backend/src/main/admin.js

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.json());


const ADMIN_ACCOUNTS = [
	{ username: 'admin', password: '1234' },
	{ username: 'test', password: '0000' },
];

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	const matchedUser = ADMIN_ACCOUNTS.find(
		user => user.username === username && user.password === password
	);

	if (matchedUser) {
		const token = createToken(username);
		return res.json({ token });
	}

	//  403 Forbidden 表示使用者沒有通行權限
	return res.status(403).json({ message: '帳號或密碼錯誤' });
});

function verifyToken(token) {
	try {
		const decoded = Buffer.from(token, 'base64').toString('utf8');
		const [username, expiry] = decoded.split('.');
		if (Date.now() > parseInt(expiry)) return null;

		const valid = ADMIN_ACCOUNTS.some(user => user.username === username);
		if (!valid) return null;

		return { username };
	} catch (e) {
		return null;
	}
}


// 產生 token
function createToken(username) {
	//   const expiry = Date.now() + 5 * 60 * 1000; // 5 分鐘後過期
	const expiry = Date.now() + 1 * 30 * 1000; // 5 分鐘後過期
	return Buffer.from(`${username}.${expiry}`).toString('base64');
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	if (!authHeader) return res.status(401).json({ message: '沒有帶 token' });
	const token = authHeader.split(' ')[1];
	const user = verifyToken(token);
	if (!user) return res.status(401).json({ message: 'Token 無效或過期' });
	req.user = user;
	next();
}

router.get('/dashboard', authenticateToken, (req, res) => {
	res.json({ message: `歡迎 ${req.user.username}，這是管理後台資訊` });
});

module.exports = router;
