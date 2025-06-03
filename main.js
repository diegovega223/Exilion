const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (app.isPackaged) {

    const indexPath = path.join(__dirname, 'build', 'index.html');
   // console.log('Cargando archivo:', indexPath);
    win.loadFile(indexPath);
  //  win.webContents.openDevTools(); // para debug
  }
  else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
