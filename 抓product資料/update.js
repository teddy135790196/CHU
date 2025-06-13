const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// 建立資料庫連線
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const str_create0 = `
UPDATE products SET imgUrl = 'https://images.plurk.com/4A7qOeuVu2qmCKVy0Pc07z.png'
where ISBN_id='999-000-123456-7';
`;
// const str_create0 = `
// UPDATE products SET ISBN_id='999-000-123456-7'
// where ISBN_id=' 999-000-123456-7';
// `;
const str_create1 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczOJO-dKwvtcRbKiewM_3jJtACoxsPqjHPD4TN2-kyIxTfLfh41lOyeTzLSbHg0i4gYNkvfYfg1Q1a7EkZHVh6mpYwLX0d7LN1L909Yu90qP1F6Tytwl-M4mTCvvj5PXTtQAjwwm7yV-zHUke26Q4bxK=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-234567-8';
`;
const str_create2 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczMmPR8O9uaQt5lFxFaKnhiXYCyHM7ItFvtpgiaN6NotI1Ayv1tiIQc99E61ves9Chntxu3MDqn2aB6NfvRnc7c3jE-aQujmQiRqfuzVkeMxdOvby0uDQzHYhdIsW4WMpzBNjbLnR13JF2TbSWYHp_Ep=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-345678-9';
`;
const str_create3 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczMBRD595RuQZdGzQlEJ5XpChTaOcrGw2m0GgWBCe9iCXFxo5vhu8jtV95qhRID_D_7N8Dfj3gJIM3zWGkl1NiD5N3gNDRJoci5kKowl69iZuOV9EMvk9w7Rnanw1a4WyF6UgGSFxmyoHmTAP6eNIyj0=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-456789-0';
`;
const str_create4 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczOBJ7ZcJFqZ3dN7B18J4D93M5wBHWrA6XadSQVMYOIyZPB83jBZBmhT8OtJwsSbr7kvf5-kLTcwyeg3ElovF4ulfblo7LEtuSqf3KXOhQ56O9Kqo9dmWNgr7t9ToZ5cbf6kkf92CudVKrsXx_jk_Kxy=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-567890-1';
`;
const str_create5 = `
UPDATE products SET imgUrl = 'https://images.plurk.com/5RUPQOQy647CbEGpUHiWaG.png'
where ISBN_id='999-000-678901-2';
`;

// const str_create5 = `
// UPDATE products SET ISBN_id='999-000-678901-2'
// where ISBN_id=' 999-000-678901-2';
// `;

const str_create6 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczOqGDlbttYs2fgCEzJeIWolta3mmWWYUzI8l2R3V_XPzSBqqQKz5slpliLqx_Lim6ZDiHJQicK81OAfPqo40McvfIfb4wpWoOUsRMfdOvcDYoMYAQPpkbXfP4UFhI6NY6GuJcQcNbIrfwUedD1UkfSJ=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-789012-3';
`;
const str_create7 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczNqL7rSgUoVhhA1z5IZutddYEzlGKR47xAR4YAQyRYqMhyO29eLPS6bwYFp0RMdY38H6urjXBSpZQKBPTHEfRRVxlXcmXh_eY5O09ruzKO4Pu2eI7eq6x8CjNu5qUGbCn6xYZin36cEP9HNI6LjRGP1=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-890123-4';
`;
const str_create8 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczNo5LhY-jXh-nerfEoXCHk0Lku8kZrhzDUOhRGINYO-BsQCvXk9pGDba4pQswBkgJsFPhq0nJ36tuswQzZdBiMV0iwFZkrEU_NyPH8uwWpy66OOxVnRWb75vAWhKhfHIFWrmoOSjBXSZNXXHlPD6tp2=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-901234-5';
`;
const str_create9 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczOl33QcuKXC9cArsnbWp6wpvObeubNOvBaLfOe7hQwF3jooYQvjH2xKV_uIkYoVPGCIwOj9E4NO9yO88aGTyFSXY9WaFxFbpiBR7SqQaX-Ox0jRtMODEFi7lc_5hGPI83VheyGf92ZJRO4-aRDFnkaO=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-012345-6';
`;
const str_create10 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczOAGVHBLFlEKYUD3QygKyNRSmS7WMHlbR1z0-KeeOmpL4LFecRcCN0K1ZsyOlO6V8HL68ada3DoL-ahbYr_pLQJPUUfxcVBRRcADdeimUp96stcIOMmBHSgrkwFBpJwaM9i5osLxbLvxXMZW_NLLYPf=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-112233-7';
`;
const str_create11 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczPDIPnK1COpYDc2ooFqUymFGpNKwhsj2CShhWF_PfNwbE-TwTY1Uhg5G5JANQJoejqXFfj99cIJmuv6w2pRYEdIvV8JhinB49npUtAOx9WijTpVrsTB0xYhriDUb9WlN37CeSoNHjX4moLKHl8vnEIK=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-223344-8';
`;
const str_create12 = `
UPDATE products SET imgUrl = 'https://lh3.googleusercontent.com/pw/AP1GczPIOQ0TPEWhDSMYjw7AE5fv5_I2XsbGzPwkNmjDwjThppve0GHdWamilFDDORXxWC1uwdzZV8yYbyS25WjosgZ2QGAnITxYdw3hvIIt_yBSygplO7jbHwvEScAcxtnka-syL90OnMW5N3FNoboHCwjq=w460-h580-s-no-gm?authuser=0'
where ISBN_id='999-000-334455-9';
`;
db.query(str_create0, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功0");
});
/* 
db.query(str_create1, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功1");
});db.query(str_create2, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功2");
});

db.query(str_create3, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功3");
});db.query(str_create4, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功4");
});
*/
db.query(str_create5, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功5");
});

/* 
db.query(str_create6, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功6");
});

db.query(str_create7, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功7");
});db.query(str_create8, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功8");
});

db.query(str_create9, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功9");
});db.query(str_create10, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功10");
});

db.query(str_create11, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功11");
});db.query(str_create12, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功12");
});
*/

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
