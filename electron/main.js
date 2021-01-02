const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');
let mainWindow;

// create window
function createWindow() {
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
    });
    mainWindow = new BrowserWindow({ 
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    });
    mainWindow.loadURL(startUrl);
    // mainWindow.webContents.openDevTools()
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

/* -------------------------------------------------------------------------- */
/*                                     IPC                                    */
/* -------------------------------------------------------------------------- */
// ipcMain.on("file.save", (e, directory, speaker, index, buffer) => {
//     try {
//         e.sender.send("file.success", "success")
//     }
//     catch (error) {
//         e.sender.send("file.error", error)
//     }
// })