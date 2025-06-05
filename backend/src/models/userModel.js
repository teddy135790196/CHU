const UserDAO = require('./dao/userDAO');
const UserDTO = require('./dto/userDTO');

// 轉換前端傳的性別成資料庫 ENUM('男', '女', '隱藏')
const genderMap = {
  male: '男',
  female: '女',
  hidden: '隱藏',
};

function createUser(userDto, callback) {
  // 轉換 gender
  if (userDto.gender) {
    userDto.gender = genderMap[userDto.gender.toLowerCase()] || null;
  }

  const user = new UserDTO(userDto);
  UserDAO.insertUser(user, callback);
}

module.exports = {
  createUser,
};
