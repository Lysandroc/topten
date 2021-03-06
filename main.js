import { app, ipcMain } from 'electron';
import menubar from 'menubar';

require('fix-path')(); // resolve user $PATH env variable
require('electron-debug')({ showDevTools: true });

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS',
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) { // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

// menubar
const mb = menubar({
  alwaysOnTop: process.env.NODE_ENV === 'development',
  minWidth: 280,
  // maxWidth: 250,
  minHeight: 350,
  // maxHeight: 350,
  preloadWindow: true,
  resizable: true,
  transparent: true,
});

mb.on('ready', async () => {
  await installExtensions();

  console.log('app is ready'); // eslint-disable-line
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ipc communication
ipcMain.on('quit', () => {
  app.quit();
});
