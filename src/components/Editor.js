import React, { useMemo } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { shallowEqual, useSelector } from 'react-redux';

const Editor = ({value, name, onChange, onSubmit, ...rest}) => {

    const mode = useSelector(state => state.ui.mode, shallowEqual)
    const theme = useMemo(() => mode==='dark' ? 'tomorrow_night':'tomorrow', [mode])

    const initEditor = (editor) => {
        editor.commands.addCommand({
            name: 'run',
            bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
            exec: (_editor) => {
                onSubmit && onSubmit()
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });
    }

    return (
        <AceEditor
            {...rest}
            theme={theme}
            value={value}
            onChange={onChange}
            name={name}
            onLoad={initEditor}
            width="100%"
            height="auto"
            wrapEnabled={true}
            style={{lineHeight: 1.75}}
            editorProps={{ $blockScrolling: true }}
            fontSize={16}
            tabSize={4}
        />
    )
}

export default Editor
