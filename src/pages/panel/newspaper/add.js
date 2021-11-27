import React from "react";
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


export default function Add()
{
    const globalStyle = useGlobalStyle();
    const style = useStyle();
    const [title, setTitle] = React.useState();


    function onTitleChange(e) {
        setTitle(e.target.value);
    }
    return (
        <div>
            <div className={globalStyle.title}>
                <Dvr/>
                <h1>Nova noticia</h1>
            </div>

            <div className={style.wrapper}>
                <form className={style.form}>
                    <TextField
                        className={style.input}
                        color="secondary"
                        label="Título da Noticia"
                        type="text"
                        variant="filled"
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
                        onChange={onTitleChange}
                    />

                    <Button style={{ marginTop: 10 }} type="submit" variant="contained" color="primary">Adicionar noticia</Button>
                </form>
            </div>
        </div>
    )
}