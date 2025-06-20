// backend/src/main/route/gmailRoute.js

const express = require('express');
const router = express.Router();
const gmailController = require('../controller/gmailController');

router.post('/', gmailController.sendVerificationEmail);

module.exports = router;
