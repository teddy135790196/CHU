class RegisterEntity {
  constructor({ id, username, password, repassword, nickname, gender, birth, email, phone }) {
    this.id = id;
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

module.exports = RegisterEntity;
