import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles, Snackbar, TextField, Button} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
    const history = useHistory();
    const { id } = useParams();
    const [message, setMessage] = useState({
        ok: false,
        content: ""
    })

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [btnDisable, setBtnDisable] = useState(false);
    
    useEffect(( ) => {
        const api_token = localStorage.getItem("cadunesc-token");
        api.get(`/posts/${id}?api_token=${api_token}`)
        .then( res => {
            if ( res.status === 200 ) {
                setTitle(res.data.title)
                setContent(res.data.content)
            }
        })
    }, [id]);

    function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
    }

    function onChangeTitle(event) {
        setTitle(event.target.value);
    }

    function onChangeContent(content) {
        setContent(content)
    }

    async function onSavePost() {
        setBtnDisable(true);

        if ( !title ) {
            snackbar("Você precisa digitar um titulo.", 5000, false);
            setBtnDisable(false);
            return
        }
        if ( !content ) {
            snackbar("Você precisa digitar um conteúdo para a postagem.", 5000, false);
            setBtnDisable(false);
            return
        }
        const api_token = localStorage.getItem("cadunesc-token");
        const response = await api.put(`/posts/${id}?api_token=${api_token}`, { title, content });
        
        if ( response.status === 200 ) {
            snackbar("Postagem atualizada com sucesso!", 5000, true);
        } else {
            snackbar("Não foi possível atualizar a postagem.", 5000, false);
        }
        setTitle("")
        setContent("")
        history.push("/posts");
        setBtnDisable(false);
    }

    return (
        <div style={{ width: "95%" }}>
            <h3 className={style.title}>Nova Postagem</h3>
            
            <TextField
                label="Titulo"
                variant="outlined"
                color="secondary"
                size="small"
                style={{ marginBottom: 10 }}
                value={title}
                onChange={onChangeTitle}
                fullWidth
            />

            <SunEditor
                lang="pt_br"
                setContents={content}
                onChange={onChangeContent}
                setOptions={{
                    buttonList: [
                        ['font', 'fontSize', 'fontColor', 'bold', 'italic', 'underline', 'align'],
                        ['image', 'link', 'video'],
                        ['removeFormat'],
                        ["preview"],
                    ],
                }}
                height="55vh"
            />
            <Button disabled={btnDisable} onClick={onSavePost} style={{ marginTop: 5 }} color="primary" variant="contained">Postar</Button>

            <Snackbar open={message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>
        </div>
    )
}