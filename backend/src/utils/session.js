// src/middlewares/session.js
const session = require('express-session');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'MySuperSecret123!@#',
  resave: false,
  saveUninitialized: true
});

module.exports = sessionMiddleware;
