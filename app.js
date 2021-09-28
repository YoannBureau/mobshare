const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 290,
        height: 310,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        alwaysOnTop: true,
        title: "MobShare",
        icon: __dirname + '/src/assets/hourglass.ico',
    })

    mainWindow.on("page-title-updated", function (event, title) {
        if(title === "MobShare Timer") {
            mainWindow.setSize(290, 111)
        }
    })

    mainWindow.webContents.openDevTools({
        mode: 'detach'
    })

    mainWindow.on('closed', function () {
        mainWindow = null
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
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})