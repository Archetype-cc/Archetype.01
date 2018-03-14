'use strict';

// Import parts of electron to use
const {app, BrowserWindow, shell, ipcMain} = require('electron');
const path = require('path')
const url = require('url')
const { exec } = require('child_process');
const { init, share, getHex, args } = require('./init');
const { mkProjectDir, mkArchetypeDir, rmArchetypeDir, mkDir, rmDir, writeFile, rmFile } = require('./lib/filesystem')
const { watch } = require('./lib/watch')
const { createDat, versionDat } = require('./lib/dat')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

function createWindow() {

  mkArchetypeDir();
  watch();
  mainWindow = new BrowserWindow({
    width: 1124, height: 768, show: false, titleBarStyle: 'hiddenInset', resizable: false

  });

  // and load the index.html of the app.
  let indexPath;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL( indexPath );

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if ( dev ) {
      // mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});


ipcMain.on('create-event', (event, dir) => {

  mkProjectDir(dir);
  mkDir(dir + "/Assets", ["css", "js"]);
  writeFile(dir + "/", "index.html", "hello Word");
  writeFile(dir + "/", "dat.json", "metadata");
  createDat(dir)
  // event.returnValue = 'pong'

})

ipcMain.on('ask-hex', (event, hex) => { versionDat(hex)})

// ipcMain.on('create-project', (event, arg) => {
//   mkDir("Assets/css")
//   mkDir("Assets/js")
//   event.returnValue = 'Project Created'
// })
