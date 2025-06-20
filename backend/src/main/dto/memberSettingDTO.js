// backend/src/main/dto/memberSettingDTO.js

class UserSettingDTO {
  constructor({ id, nickname, gender, birth, summary, email, phone, address, isEmailVerified }) {
    this.id = id;
    this.nickname = nickname;
    this.gender = gender;
    this.birth = birth;
    this.summary = summary;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.isEmailVerified = isEmailVerified;
  }
}

module.exports = UserSettingDTO;