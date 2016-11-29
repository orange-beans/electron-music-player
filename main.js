'use strict';

const electron = require('electron');
const path = require('path');


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const globalShortcut = electron.globalShortcut;

let mainWindow = null;

ipcMain.on('close-main-window', function () {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    height: 700,
    width: 368,
    resizable: false,
    frame: false,
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('ping', 'whoooooooh!');
  });

  globalShortcut.register('Ctrl+Shift+1', function () {
    mainWindow.webContents.send('global-shortcut', 0);
  });
  globalShortcut.register('ctrl+shift+2', function () {
    mainWindow.webContents.send('global-shortcut', 1);
    console.log('CommandOrControl+A is pressed');
  });
});
