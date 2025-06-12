// backend/src/main/dto/loginDTO.js

// form: { username: '', password: '', },
class loginDTO {
	constructor({ username, password }) {
		this.username = username;
		this.password = password;
	}
}

module.exports = loginDTO;