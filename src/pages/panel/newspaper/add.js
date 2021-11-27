import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import
{
    Button,
    TextField
}
from "@material-ui/core";
import useGlobalStyle from "../../../globalStyle";
import useStyle from "./style";

// @icons
import { Dvr } from "@material-ui/icons";


// @api
import api from "../../../api/axios";

export default function Add()
{
    const history = useHistory();
    const globalStyle = useGlobalStyle();
    const style = useStyle();
    const [title, setTitle] = useState();
    const [file, setFile] = useState();
    const [disabled, setDisabled] = useState(false);


    function onTitleChange(e) {
        setTitle(e.target.value);
    }

    function onChangeFile(e) {
        setFile(e.target.files[0])
    }

    function onSubmitNotice(e) {
        e.preventDefault();
        
        setDisabled(true);

        const api_token = localStorage.getItem('cadunesc-token');

        const data = new FormData();

        data.append("file", file);
        data.append("title", title);

        api.post(`/newspaper?api_token=${api_token}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then( res => {
            if ( res.status === 201 ){
                alert("Noticia adicionada com sucesso!");
                history.push("/newspaper");
            }
            setTitle("");
            setFile("");
            setDisabled(false);
        }).catch( error => {
            alert("Não foi possível adicionar a noticia ao site.");
            setDisabled(false);
        })
    }

    return (
        <div>
            <div className={globalStyle.title}>
                <Dvr/>
                <h1>Nova noticia</h1>
            </div>

            <div className={style.wrapper}>
                <form className={style.form} onSubmit={onSubmitNotice}>
                    <TextField
                        className={style.input}
                        color="secondary"
                        label="Título da Noticia"
                        type="text"
                        variant="outlined"
                        size="small"
                        required
                        onChange={onTitleChange}
                    />

                    <TextField
                        className={style.input}
                        label="Arquivo"
                        focused
                        required
                        color="secondary"
                        type="file"
                        variant="outlined"
                        size="small"
                        onChange={onChangeFile}
                    />

                    <Button
                        style={{ marginTop: 10 }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={disabled}
                    >
                        Adicionar noticia
                    </Button>
                </form>
            </div>
        </div>
    )
}