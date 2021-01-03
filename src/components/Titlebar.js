import React, { useState } from 'react'
import { useService } from "../providers";
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { SetMode } from '../store/actions/ui';

const Titlebar = ({title}) => {

    const dispatch = useDispatch()
    const mode = useSelector(state => state.ui.mode, shallowEqual)

    const electron = useService('electron')
    const [maximized, setMaximized] = useState(electron.maximized)

    const maximizeOrRestore = () => {
        maximized ? electron.window.unmaximize() : electron.window.maximize()
        setMaximized(electron.maximized)
    }

    const minimize = () => {
        electron.window.minimize()
    }

    const toggleMode = () => {
        dispatch(SetMode(mode === 'dark' ? 'light' : 'dark'))
    }

    return (
        <div className="titlebar bg-primary-700">
            <h1 className="text-sm text-white px-4">{title}</h1>
            <div className="ml-auto flex items-center">
                <button onClick ={toggleMode}
                    className="mr-4 action text-primary-400 bg-primary-800 hover:text-white">
                    {
                        mode === 'dark' ?<RiSunLine size={14}/> : <RiMoonClearLine size={14}/>
                    }
                </button>
                <button onClick ={minimize}
                    className="action text-primary-400 hover:text-white hover:bg-green-500">
                    <VscChromeMinimize size={14}/>
                </button>
                <button onClick={maximizeOrRestore}
                    className="action text-primary-400 hover:text-white hover:bg-yellow-500">
                    {
                        maximized ? (
                            <VscChromeRestore size={14}/>
                        ) : (
                            <VscChromeMaximize size={14}/>
                        )
                    }
                </button>
                <button onClick={() => electron.close()} 
                    className="action text-primary-400 hover:text-white hover:bg-red-500">
                    <VscChromeClose size={14}/>
                </button>
            </div>
        </div>
    )
}

export default Titlebar
