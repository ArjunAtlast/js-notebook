import React, { useState } from 'react'
import {addCell, createCell, removeCell, updateCell} from '../helpers'
import CodeCell from '../components/CodeCell';
import { RiAddLine } from 'react-icons/ri'
import { useService } from '../providers';
import { toast } from 'react-toastify';

const Notebook = () => {

    const electron = useService('electron')

    const [cells, setCells] = useState([
        createCell({value: '// start your coding'})
    ])
    // Add new cell
    const handleCellCreate = (type='code', position=-1) => {
        const newCell = createCell({type})
        setCells(c => addCell(c, newCell, position))
    }
    // Update cell
    const handleCellUpdate = (index, props) => {
        setCells(c => updateCell(c, index, props))
    }
    // Delete cell
    const handleCellDelete = (index) => {
        setCells(c => removeCell(c, index))
    }

    // Running a cell
    const runCell = async (index) => {
        try {
            const cell = cells[index]
            // update as running
            setCells(c => updateCell(c, index, { running: true }))
            // send request
            const [result, error] = await electron.execute(cell.name, cell.value)
            setCells(c => updateCell(c, index, { 
                running: false, 
                rendered: true, 
                output: result,
                error: error
            }))
        }
        catch (err) {
            setCells(c => updateCell(c, index, { running: false, error: err }))
        }
    }

    return (
        <div>
            <div className="space-y-4">
                {
                    cells.map((cell, i) => (
                        <CodeCell
                            key={cell.name}
                            cell={cell}
                            onSubmit={() => runCell(i)}
                            onDelete={() => handleCellDelete(i)}
                            onChange={value => handleCellUpdate(i, {value})} />
                    ))
                }
                <pre>{JSON.stringify(cells, null, 2)}</pre>
            </div>
            <div className="mt-4 flex justify-center items-center space-x-4">
                <button 
                    onClick={() => handleCellCreate()}
                    className="pl-2 pr-4 text-sm py-2 bg-primary-600 hover:bg-primary-500 text-white uppercase flex items-center">
                    <RiAddLine className="mr-2" size={16}/>
                    <span>Add Cell</span>
                </button>
            </div>
        </div>
    )
}

export default Notebook
