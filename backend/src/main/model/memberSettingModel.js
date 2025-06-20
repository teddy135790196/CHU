// backend/src/main/model/memberSettingModel.js

const memberSettingDAO = require('../dao/memberSettingDAO');

function selectUserSettingData(userForm, callback) {
  memberSettingDAO.selectUserSettingData(userForm, callback);
}

function updateUserSettingInfo(userForm, callback) {
  memberSettingDAO.updateUserSettingInfo(userForm, callback);
}

function updateUserSettingContact(userForm, callback) {
  memberSettingDAO.updateUserSettingContact(userForm, callback);
}

module.exports = {
  selectUserSettingData,
  updateUserSettingInfo,
  updateUserSettingContact,
};