// src/models/dto/loginDTO.js

class loginDTO {
	constructor({ username, password }){
		this.username = username;
		this.password = password;
	}
}

module.exports = loginDTO;