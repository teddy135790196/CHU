// backend/src/main/model/memberSettingModel.js

const memberSettingDAO = require('../dao/memberSettingDAO');

function selectUserSettingData(userForm, callback) {
  memberSettingDAO.selectUserSettingData(userForm, callback);
}

module.exports = {
  selectUserSettingData,
};