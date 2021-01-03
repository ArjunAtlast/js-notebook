import { useMemo } from "react";
import { RiPlayCircleLine, RiDeleteBinLine, RiLoaderLine } from 'react-icons/ri'
import ReactJson from 'react-json-view'

// import "ace-builds/src-noconflict/snippets/javascript";

import { shallowEqual, useSelector } from "react-redux";
import Editor from "./Editor";

const CellOut = ({value, type='log'}) => {

    const mode = useSelector(state => state.ui.mode, shallowEqual)
    const showcode = useMemo(() => typeof value === 'object', [value])
    const colors = {
        number: 'yellow',
        string: 'green',
        boolean: 'pink'
    }

    switch(type) {
        case 'error':
            return (
                <div class="px-4 bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200">
                    <pre>{JSON.stringify(value)}</pre>
                </div>
            )
        default:
            return (
                <div class="px-4">
                    {
                        showcode ? (
                            <ReactJson 
                                theme={mode === 'dark' ? 'tomorrow' : 'rjv-default'}
                                displayDataTypes={false}
                                iconStyle="square"
                                name={false}
                                style={{
                                    background:'transparent', 
                                    padding: '1rem',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}
                                src={JSON.parse(JSON.stringify(value))}/>
                        ) : (
                            <pre className={`text-${colors[typeof value]}-400`}>{JSON.stringify(value)}</pre>
                        )
                    }
                </div>
            )
    }
}

const CodeCell = ({cell, onChange=null, onSubmit=null, onDelete=null}) => {

    const mode = useSelector(state => state.ui.mode, shallowEqual)
    const theme = useMemo(() => mode==='dark' ? 'tomorrow_night':'tomorrow', [mode])

    const handleSubmit = () => {
        onSubmit && onSubmit()
    }

    const handleDelete = () => {
        onDelete && onDelete()
    }

    return (
        <div className="w-full">
            {/* Action bar for each cell */}
            <div className={`w-full h-10 bg-primary-700 flex items-center`}>
                {
                    cell.running ? (
                        <div
                            style={{width: '42px'}} 
                            className="h-10 flex text-white">
                                <RiLoaderLine className="m-auto animate-spin" size={20}/>
                        </div>
                    ) : (
                        <button 
                            onClick={handleSubmit}
                            style={{width: '42px'}} 
                            className="h-10 flex text-white opacity-50 hover:opacity-100 hover:bg-green-500">
                            <RiPlayCircleLine className="m-auto" size={20}/>
                        </button>
                    )
                }
                <div className="ml-auto">
                    <button 
                        onClick={handleDelete}
                        style={{width: '42px'}} 
                        className="h-10 flex text-white opacity-50 hover:opacity-100">
                        <RiDeleteBinLine className="m-auto" size={20}/>
                    </button>
                </div>
            </div>
            <div className="flex-grow">
                <Editor
                    mode="javascript"
                    theme={theme}
                    value={cell.value}
                    onChange={onChange}
                    onSubmit={handleSubmit}
                    name={cell.name}
                    minLines={5}
                    maxLines={10}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true
                    }}
                />
                {
                    (cell.output.length > 0 || cell.error) && (
                        <div style={{lineHeight: 1.9}} 
                            className="w-full bg-gray-200 dark:bg-gray-600">
                            {
                                cell.output.map((out, i) => (
                                    <CellOut key={i} value={out.value} type={out.type} />
                                ))
                            }
                            {
                                cell.error && (
                                    <CellOut value={cell.error.message} type="error" />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CodeCell
