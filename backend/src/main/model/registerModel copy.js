// backend/src/main/model/registerModel.js

const RegisterDAO = require('../dao/registerDAO');
const RegisterDTO = require('../dto/registerDTO');

// 轉換前端傳的性別成資料庫 ENUM('男', '女', '隱藏')
const genderMap = {
  male: '男',
  female: '女',
  hidden: '隱藏',
};

function createRegister(registerDto, callback) {
  // 轉換 gender
  if (registerDto.gender) {
    registerDto.gender = genderMap[registerDto.gender.toLowerCase()] || null;
  }

  const user = new RegisterDTO(registerDto);
  RegisterDAO.insertRegister(user, callback);
}

module.exports = {
  createRegister,
};
