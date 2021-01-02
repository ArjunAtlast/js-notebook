const electron = window.require('electron')

class ElectronService {

    constructor() {
        this.ipc = electron.ipcRenderer
        this.saveDir = null
    }

    get window() {
        return electron.remote.getCurrentWindow()
    }

    get maximized() {
        return this.window.isMaximized()
    }

    close() {
        this.window.close()
    }

    async selectSaveDir() {
        const result = await electron.remote.dialog.showOpenDialog(null, {
            title: "Select Save Folder",
            properties: ['openDirectory'],
        })
        
        if (!result.canceled) {
            this.saveDir = result.filePaths[0]
        }
    }

    /**
     * Save the list of audios.
     * @param {Blob[]} blobs - The array of blobs
     * @param {string} speaker - The name of speaker
     */
    async saveSamples(blobs, speaker) {
        await this.selectSaveDir()
        return Promise.all(blobs.map((blob, i) => this.__sendBlob(blob, speaker, i)))
    }

    async __sendBlob(blob, speaker, index) {
        console.log("saving", index)
        return new Promise((resolve, reject) => {
            this.ipc.once("file.saved", (_, path) => {
                resolve(path)
            })
            this.ipc.once("file.error", (_, error) => {
                reject(error)
            })
            // Read blob
            let reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const buffer = Buffer.from(reader.result)
                    this.ipc.send("file.save", this.saveDir, speaker, index, buffer)
                }
            }
            reader.readAsArrayBuffer(blob)
        })
    }

}

export default ElectronService