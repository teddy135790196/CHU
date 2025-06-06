// src/models/loginModel.js

const LoginDAO = require('./dao/loginDAO');
const LoginDTO = require('./dto/loginDTO');

// function createRegister(registerDto, callback) {
//   // 轉換 gender
//   if (registerDto.gender) {
//     registerDto.gender = genderMap[registerDto.gender.toLowerCase()] || null;
//   }

//   const user = new LoginDTO(registerDto);
//   LoginDAO.insertRegister(user, callback);
// }

// module.exports = {
//   createRegister,
// };
