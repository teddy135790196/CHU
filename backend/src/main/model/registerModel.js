// backend/src/main/model/registerModel.js

const registerDAO = require('../dao/registerDAO');
const registerDTO = require('../dto/registerDTO');

// 轉換前端傳的性別成資料庫 ENUM('男性', '女性', '隱藏')
const genderMap = {
  male: '男性',
  female: '女性',
  hidden: '隱藏',
};

function insertRegisterData(registerForm, callback) {		// registerForm => 前端傳來的表單
  // 轉換 gender
  if(registerForm.gender) {
    registerForm.gender = genderMap[registerForm.gender.toLowerCase()] || null;
  }

  const dto = new registerDTO(registerForm);
  registerDAO.insertRegisterData(dto, callback);
};

module.exports = {
  insertRegisterData,
};