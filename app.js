const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 290,
        height: 310,
        autoHideMenuBar: true,
        //frame: false,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    })

    mainWindow.loadURL("http://localhost:4200/");

    // mainWindow.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, `/dist/electron-app/index.html`),
    //         protocol: "file:",
    //         slashes: true
    //     })
    // );
    // Open the DevTools.

    mainWindow.webContents.openDevTools({
        mode: 'detach'
    })

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})