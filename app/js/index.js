// Add your index.js code in this file

'use strict';
const electron = require('electron');
const { ipcRenderer, remote } = electron;
const { Menu, Tray } = remote;
const path = require('path');

// DOM elements
const soundButtons = document.querySelectorAll('.button-sound');
const closeEl = document.querySelector('.close');
const settingEl = document.querySelector('.settings');

let trayIcon = null;
let trayMenu = null;

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

if (process.platform === 'darwin') {
  trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
} else {
  trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}

let trayMenuTemplate = [
  {
    label: 'Music Player',
    enabled: false,
  },
  {
    label: 'Setting',
    click: function () {
      ipcRenderer.send('open-settings-window');
    },
  },
  {
    label: 'Quit',
    click: function () {
      ipcRenderer.send('close-main-window');
    },
  },
];

trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);

// Helpers
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
