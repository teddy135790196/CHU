// backend/src/main/service/memberSettingService.js

const UserSettingDTO = require('../dto/memberSettingDTO');
const memberSettingModel = require('../model/memberSettingModel');

function selectUserSettingData(userForm) {
  return new Promise((resolve, reject) => {

    const dto = new UserSettingDTO({ id: userForm.id });

    memberSettingModel.selectUserSettingData(dto, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (!result) {
        reject(new Error('找不到使用者'));
        return;
      }

      resolve(result);
    });
  });
}

module.exports = {
  selectUserSettingData,
};