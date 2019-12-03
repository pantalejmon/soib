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
        ipcMain.on('selectMaterial', (event, material, min, max, step) => {
            event.reply('sendData', this.calculation.compute(material, min, max, step));
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
        //this.mainWindow.webContents.openDevTools();
        this.mainWindow.setMenuBarVisibility(false);
        // Emitted when the window is closed.
        this.mainWindow.on("closed", () => {

        });
    }
}