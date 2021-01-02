import React, { useState } from 'react'
import { useService } from "../providers";
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'

const Titlebar = () => {

    const electron = useService('electron')
    const [maximized, setMaximized] = useState(electron.maximized)

    const maximizeOrRestore = () => {
        maximized ? electron.window.unmaximize() : electron.window.maximize()
        setMaximized(electron.maximized)
    }

    const minimize = () => {
        electron.window.minimize()
    }

    return (
        <div className="titlebar bg-blue-900">
            <h1 className="text-sm text-white px-4">Audio Recorder</h1>
            <div className="ml-auto flex items-center">
                <button onClick ={minimize}
                    className="action text-gray-400 hover:text-white hover:bg-green-500">
                    <VscChromeMinimize size={14}/>
                </button>
                <button onClick={maximizeOrRestore}
                    className="action text-gray-400 hover:text-white hover:bg-yellow-500">
                    {
                        maximized ? (
                            <VscChromeRestore size={14}/>
                        ) : (
                            <VscChromeMaximize size={14}/>
                        )
                    }
                </button>
                <button onClick={() => electron.close()} 
                    className="action text-gray-400 hover:text-white hover:bg-red-500">
                    <VscChromeClose size={14}/>
                </button>
            </div>
        </div>
    )
}

export default Titlebar
