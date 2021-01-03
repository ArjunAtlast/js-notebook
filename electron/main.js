const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');
const executor = require('./executor')
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
    if (process.env.NODE_ENV !== 'production') {
        mainWindow.webContents.openDevTools()
    }
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
ipcMain.on("execution/request", (e, name, code) => {
    const SUCCESS = 1
    const FAIL = 0
    try {
        const exec = executor()
        console.log('Executing script ' + name)
        const {results, error, counter} = exec.run(code, name)
        e.sender.send(`execution/${name}`, SUCCESS, results, error)
    }
    catch (error) {
        e.sender.send(`execution/${name}`, FAIL, null, error)
    }
})