import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import C from "../config/constants";
import Calculation from "../data/calculation";

export default class WindowController {
    private mainWindow: Electron.BrowserWindow | undefined;
    private calculation: Calculation = new Calculation();
    constructor() {
        this.createAPI();
        app.on("ready", this.createWindow);
        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        });

        app.on("activate", () => {
            if (this.mainWindow === null) {

                this.createWindow();

            }
        });

    }


    createAPI() {

        console.log("Tworze api");
        ipcMain.on('selectMaterial', (event, arg) => {
            event.reply('sendData', this.calculation.compute(arg));
        })
    }

    createWindow(): void {
        this.mainWindow = new BrowserWindow({
            height: C.getWindowHeight(),
            width: C.getWindowWidth(),

            webPreferences: {
                nodeIntegration: true
            }
        })
        this.mainWindow.loadFile("../src/view/index.html");
        // Open the DevTools.
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.setMenuBarVisibility(false);
        // Emitted when the window is closed.
        this.mainWindow.on("closed", () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            //mainWindow = null;
        });
    }
}