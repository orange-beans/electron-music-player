'use strict';

const nconf = require('nconf').file({ file: getUserHome() + '/music-player.json' });

function saveSettings(settingKey, settingValue) {
  nconf.set(settingKey, settingValue);
  nconf.save();
}

function readSettings(settingKey) {
  nconf.load();
  return nconf.get(settingKey);
}

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
  saveSettings,
  readSettings,
};
