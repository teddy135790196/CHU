// backend/src/main/route/emailVerificationRoute.js

const express = require('express');
const router = express.Router();
const emailVerificationController = require('../controller/emailVerificationController');

// /api/email-verification/send
router.post('/send', emailVerificationController.sendVerificationEmail);
// /api/email-verification/verify
router.get('/verify', emailVerificationController.verifyEmail);

module.exports = router;
