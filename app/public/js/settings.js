// Add your settings.js code in this file
'use strict';

const electron = require('electron');
const { ipcRenderer } = electron;

const configuration = require('../configuration.js');
//const ipcRenderer = electron.ipcRenderer;

// DOM elements
const closeEl = document.querySelector('.close');
const modifierCheckboxes = document.querySelectorAll('.global-shortcut');

closeEl.addEventListener('click', () => {
  ipcRenderer.send('close-settings-window');
});

modifierCheckboxes.forEach((item, index) => {
  let shortcutKeys = configuration.readSettings('shortcutKeys');
  let modifierKey = item.attributes['data-modifier-key'].value;
  item.checked = shortcutKeys.indexOf(modifierKey) !== -1;

  item.addEventListener('click', (e) => {
    bindModifierCheckboxes(e);
  });

});

function bindModifierCheckboxes(e) {
  let shortcutKeys = configuration.readSettings('shortcutKeys');
  let modifierKey  = e.target.attributes['data-modifier-key'].value;

  if (shortcutKeys.indexOf(modifierKey) !== -1) {
    let shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
    shortcutKeys.splice(shortcutKeyIndex, 1);
  } else {
    shortcutKeys.push(modifierKey);
  }

  configuration.saveSettings('shortcutKeys', shortcutKeys);
  ipcRenderer.send('set-global-shortcuts');
}
