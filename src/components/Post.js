import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default function Post() {
    const [html, setHtml] = useState("")
    function onSaveHtml(event) {
        if ( event.ctrlKey && event.keyCode )
        {

        }
    }

    function onChangeTextHtml(content) {
        setHtml(content);
    }
    return (
        <div>
            <h3>Novo Tópico</h3>
            <SunEditor
                lang="pt_br"
                setContents={html}
                onChange={onChangeTextHtml}
                setOptions={{
                    buttonList: [
                        ['font', 'fontSize', 'fontColor', 'hiliteColor', 'bold', 'italic', 'underline', 'strike'],
                        ['superscript', 'subscript'],
                        ['indent', 'outdent'],
                        ["align", "horizontalRule", "list", "table"],
                        ['image', 'link', 'video'],
                        ['undo', 'redo'],
                        ['removeFormat'],
                        ["save", "preview"]
                    ]
                }}
                onKeyUp={onSaveHtml}
                width="90%"
                height="70vh"
            />
            <div>
                {encodeURIComponent(html)}
                <div id="html">
                </div>
            </div>
        </div>
    )
}