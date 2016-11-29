// Add your index.js code in this file

'use strict';
var electron = require('electron');
var ipcRenderer = electron.ipcRenderer;

var soundButtons = document.querySelectorAll('.button-sound');
var closeEl = document.querySelector('.close');

// Events
closeEl.addEventListener('click', function() {
  ipcRenderer.send('close-main-window');
});


for (var i=0; i<soundButtons.length; i++) {
  var soundButton = soundButtons[i];
  var soundName = soundButton.attributes['data-sound'].value;

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
  var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
  audio.currentTime = 0;
  audio.play();
}

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
