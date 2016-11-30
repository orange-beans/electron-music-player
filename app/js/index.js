// Add your index.js code in this file

'use strict';
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

// DOM elements
const soundButtons = document.querySelectorAll('.button-sound');
const closeEl = document.querySelector('.close');
const settingEl = document.querySelector('.settings');

// Events
closeEl.addEventListener('click', function() {
  ipcRenderer.send('close-main-window');
});
settingEl.addEventListener('click', () => {
  ipcRenderer.send('open-settings-window');
});

// IPC message handling
ipcRenderer.on('global-shortcut', (event, message) => {
  switch(message) {
    case 0:
      playSound('money');
      break;
    case 1:
      playSound('ba-dum-tsss');
      break;
    default:
      break;
  }
});

for (let i=0; i<soundButtons.length; i++) {
  let soundButton = soundButtons[i];
  let soundName = soundButton.attributes['data-sound'].value;

  prepareButton(soundButton, soundName);
}

// function prepareButton(buttonEl, soundName) {
//   buttonEl.querySelector('span').style.backgroundImage =
//     'url("img/icons/' + soundName + '.png")';
//   var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
//   buttonEl.addEventListener('click', function () {
//     audio.currentTime = 0;
//     audio.play();
//   });
// }
function prepareButton(buttonEl, soundName) {
  buttonEl.querySelector('span').style.backgroundImage =
    'url("img/icons/' + soundName + '.png")';
  buttonEl.addEventListener('click', function () {
    playSound(soundName);
  });
}

function playSound(soundName) {
  let audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
  audio.currentTime = 0;
  audio.play();
}
