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

    /**
     * Execute the code
     * @param {str} name - A unique name to identify the execution cell
     * @param {str} code - The code to execute
     */
    async execute(name, code) {
        
        return new Promise((resolve, reject) => {
            this.ipc.once(`execution/${name}`, (e, status, result, error) => {
                if (status === 1) {
                    resolve([result, error])
                }
                else {
                    reject(error)
                }
            })
            this.ipc.send("execution/request", name, code)
        })
    }

}

export default ElectronService