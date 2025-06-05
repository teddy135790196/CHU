// model/dto/userDTO.js

// form: { username: '', password: '', repassword: '', nickname: '', gender: '', birth: '', email: '', phone: '' }
class UserDTO {
  constructor({ username, password, repassword, nickname, gender, birth, email, phone }) {
    this.username = username;
    this.password = password;
    this.repassword = repassword;
    this.nickname = nickname;
    this.gender = gender;
    this.birth = birth;
    this.email = email;
    this.phone = phone;
  }
}

module.exports = UserDTO;
