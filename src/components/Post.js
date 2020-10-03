import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import api from '../api/axios';


import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';



const useStyle = makeStyles({
    title: {
        marginTop: 15,
        fontFamily: "'Roboto Slab', sans-serif",
        color: "#5A5A5A",
        marginBottom: 20
    }
})

export default function Post() {
    const style = useStyle();
    const [text, setText] = useState("")
    
    function onChangeText(content) {
        setText(content);
    }

    return (
        <div>
            <h3 className={style.title}>Novo Tópico</h3>
            <SunEditor
                lang="pt_br"
                setContents={text}
                onChange={onChangeText}
                setOptions={{
                    buttonList: [
                        ['font', 'fontSize', 'fontColor', 'bold', 'italic', 'underline', 'align'],
                        ['image', 'link', 'video'],
                        ['removeFormat'],
                        ["save", "preview"],
                    ],
                    callBackSave: function ( content ) {
                        api.post("/post", { content: escape(content) });
                    }
                }}
                height="70vh"
            />
        </div>
    )
}