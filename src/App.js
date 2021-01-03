import Titlebar from './components/Titlebar';
import { ToastContainer } from 'react-toastify';
import { shallowEqual, useSelector } from 'react-redux';
import Notebook from './partials/Notebook';


function App() {

    const mode = useSelector(state => state.ui.mode, shallowEqual)
    console.log(mode)

    return (
        <div className={mode === 'dark' ? 'dark':''}>
            <div className="w-screen h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
                <Titlebar title="{JS} Notebook"/>
                <div className="p-4 flex-grow overflow-y-auto">
                    <Notebook />
                </div>
            </div>
            {/* Toast container */}
            <ToastContainer hideProgressBar={true} position="bottom-right" />
        </div>
    );
}

export default App;
