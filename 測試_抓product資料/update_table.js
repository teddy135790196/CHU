const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 建立資料庫連線
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// UPDATE table_name SET column1 = value1, column2 = value2, ...WHERE condition;
const str_create1 = `
  UPDATE T_book 
  SET 
    bookDescribe = 'This comprehensive volume delves into the foundational principles and advanced applications of "Tlime Glidlern Tay," a groundbreaking generative art framework. It offers an in-depth analysis of its algorithmic structures, data input methodologies, and emergent aesthetic capabilities across diverse visual domains. The book explores its theoretical underpinnings in context-aware design, procedural texture generation, and its potential in complex interactive art installations. Intended for digital artists, computational designers, and researchers in creative AI, this work provides critical insights into the next generation of algorithmic art and design systems.',
    pub_com = 'Synthetica Press',
    lan = '英文',
    page = 664,
    price = 1066,
    stock = 76,
    imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczPKEGCxOJ2o5GhtVSDRHLKZxiYceZQLfUc-gLNT6kxKK-RCsrevpjoIQZV0E8efyPVL8a4lK2ocCjVc_CA2Pbhjc--wrz52-Ublquv2PHy65CKBxpPdI2bR4VU9tnU4_iaDSxgdyVSKjmc1TZuvezhR=w460-h580-s-no-gm?authuser=0'
  WHERE ISBN = '999-000-368887-7';
`;

const str_create2 = `
  UPDATE T_book 
  SET 
    bookDescribe = 'Navigating the complexities of design integrity and material authenticity in book production is the central theme of this scholarly work. "The Surest of the book" provides a robust framework for assessing the craftsmanship, tactile qualities, and historical provenance of bookbinding and publication design. It examines methodologies for material selection, structural integrity, and the establishment of aesthetic standards for printed matter. The volume addresses critical issues in preservation design, ethical restoration, and the evolving standards for durability and beauty in physical books. This book is an invaluable resource for bookbinders, publication designers, conservators, and scholars of material culture.',
    pub_com = 'Synthetica Press',
    lan = '英文',
    page = 560,
    price = 388,
    stock = 250,
    imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczPzOIaiei_Pc_jK02ayrHoPjV4cm6WOKtogRPbhccmpjp3_JIhT4pumnir5u9-CsIi4yb1BdPRns6tYY05lOBUh0lt7sZnFsqRNGaGa3ou8vEE1iO6k7KabpZlxp1byq2oOAjxJMbTArnEO4ZSsKWfc=w460-h580-s-no-gm?authuser=0'
  WHERE ISBN = '999-000-499514-7';
`;

const str_create3 = `
  UPDATE T_book 
  SET 
    bookDescribe = 'This academic treatise explores the significant, yet often overlooked, "Ameriers" – pivotal figures or movements that profoundly shaped the landscape of early American typography, illustration, and visual communication. Through meticulous archival research and design analysis, the book uncovers how these Ameriers influenced type design, woodcut and engraving techniques, layout principles, and the overall visual identity of nascent American publications. It examines their roles in establishing graphic standards, promoting visual literacy, and contributing to the aesthetic infrastructure of the young nation. This is a foundational text for graphic designers, typographers, and historians of American visual culture.',
    pub_com = 'Synthetica Press',
    lan = '英文',
    page = 485,
    price = 281,
    stock = 9,
    imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczMMXmslH6bMYwHfnJbC20Q4vc_5i5nuyhT3FEIUFmyZpMqnS1vlrgvSYjOPfaqOiHjtxD4Ea9k704AUNwbVUCHq46bEgd7lz7dps49N833nZ-qF1OyCgoJsCK9FlKFvDEUqCZNkqlHZI5OqgIWdLrQw=w460-h580-s-no-gm?authuser=0'
  WHERE ISBN = '999-000-568782-2';
`;

const str_create4 = `
  UPDATE T_book 
  SET 
    pub_com = 'Synthetica Press',
    lan = '英文',
    page = 1109,
    price = 463,
    stock = 207,
    imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczPRuGABwll5rDQ1BtQSrHvQvTNaArWFtO1XduPk1jpB6h2P2G158-MuPidypNwXRz8u5QAJNYho5I3pBJll4ruO-5ZTL58Hd090bmgLz2NOQuoLwxcW389hOcyTWM9m3ocJsIKPMfhTD6PlGyd3wlDC=w460-h580-s-no-gm?authuser=0'
  WHERE ISBN = '999-000-612363-3';
`;

const str_create5 = `
  UPDATE T_book SET bookDescribe = SUBSTRING(bookDescribe, 1, 588)
   WHERE ISBN = '999-000-612363-3';
`;


// SET 
    
/*
db.query(str_create1, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("第一條更新成功"); 
});
db.query(str_create2, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("第2條更新成功"); 
});
db.query(str_create3, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("第3條更新成功"); 
});
db.query(str_create4, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("第4條更新成功"); 
});
*/ 
db.query(str_create5, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("第5條更新成功"); 
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
