/**
 * Created by Shariar Shaikot on 10/1/16.
 */

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1200, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});

module.exports = {
  resize: () => {
    // mainWindow.setSize(250, 250);
    alert('Hola World!');
  }
};