// backend/src/main/service/memberSettingService.js

const UserSettingDTO = require('../dto/memberSettingDTO');
const memberSettingModel = require('../model/memberSettingModel');

function selectUserSettingData(userForm) {
  return new Promise((resolve, reject) => {
    const dto = new UserSettingDTO({ id: userForm.id });

    memberSettingModel.selectUserSettingData(dto, (err, result) => {
      if (err) return reject(err);
      if (!result) return reject(new Error('找不到使用者'));
      resolve(result);
    });
  });
}

function updateUserSettingInfo(userForm) {
  const dto = new UserSettingDTO({
    id: userForm.id,
    nickname: userForm.nickname,
    gender: userForm.gender,
    birth: userForm.birth,
    summary: userForm.summary,
  });

  return new Promise((resolve, reject) => {
    memberSettingModel.updateUserSettingInfo(dto, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function updateUserSettingContact(userForm) {
  const dto = new UserSettingDTO({
    id: userForm.id,
    email: userForm.email,
    phone: userForm.phone,
    address: userForm.address,
  });

  return new Promise((resolve, reject) => {
    memberSettingModel.updateUserSettingContact(dto, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  selectUserSettingData,
  updateUserSettingInfo,
  updateUserSettingContact,
};
