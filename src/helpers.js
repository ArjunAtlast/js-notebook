export function createCell({
    name,
    type='code',
    value='',
    output=[],
    running=false,
    rendered=false,
    error=null,
    counter=-1
}) {
    return {
        name: name || 'code.' + new Date().getTime().toString(),
        type,
        value,
        output,
        running,
        rendered,
        error,
        counter
    }
}

export function updateCell(cells, index, props) {
    const cell = {
        ...cells[index],
        ...props
    }
    cells[index] = cell
    return [...cells]
}

export function addCell(cells, cell, position=-1) {
    if (position < 0 || position >= cells.length) {
        return cells.concat([cell])
    }
    else {
        return [
            ...cells.slice(0, position),
            cell,
            ...cells.slice(position, cells.length)
        ]
    }
}

export function removeCell(cells, index) {
    if (index < 0 || index >= cells.length) {
        return cells
    }
    else {
        return [
            ...cells.slice(0, index),
            ...cells.slice(index+1, cells.length)
        ]
    }
}