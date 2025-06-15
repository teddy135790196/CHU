// backend/src/main/dto/registerDTO.js

// form: { username: '', password: '', repassword: '', nickname: '', gender: '', birth: '', email: '', phone: '', },
class RegisterDTO {
  constructor({ username, password, repassword, nickname, gender, birth, email, phone, summary}) {
    this.username = username;
    this.password = password;
    this.repassword = repassword;
    this.nickname = nickname;
    this.gender = gender;
    this.birth = birth;
    this.email = email;
    this.phone = phone;
    this.summary = summary;
  }
}

module.exports = RegisterDTO;