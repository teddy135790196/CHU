// backend/src/middlewares/session.js

const session = require('express-session');

const isProd = process.env.NODE_ENV !== 'development';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'MySuperSecret123!@#',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,            // 本地false，雲端true
    sameSite: isProd ? 'none' : 'lax',
    httpOnly: true
  }
});


module.exports = sessionMiddleware;
