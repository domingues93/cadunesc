import React, { useState } from 'react';
import
{
    Grid,
    TextField,
    Button,
    makeStyles,
    Snackbar
}
from '@material-ui/core';
import { Alert } from "@material-ui/lab";

import api from '../api/axios';

const useStyle = makeStyles({
    container:{
        width: "95%"
    },
    title: {
        padding: "25px 0",
        fontFamily: "'Roboto Slab', sans-serif" ,
        color: "#5A5A5A",
    }
});

const d = new Date();
const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

const INITIAL_DATA = {
    name: "",
    address: "",
    contact_button_url: "",
    description: "",
    start_at: `${year}-${month}-${day}T00:00`,
    end_at: `${year}-${month}-${day}T23:59`
}

export default function FormNewEvent() {
    
    const style = useStyle();
    const [data, setData] = useState(INITIAL_DATA);
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        ok: false,
        content: ""
    });

    function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
    }
    
    
    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const api_token = localStorage.getItem('cadunesc-token');
        
        const postData = new FormData();

        postData.append('file', file);
        postData.append('name', data.name)
        postData.append('start_at', data.start_at)
        postData.append('end_at', data.end_at)
        postData.append('description', data.description)
        postData.append('address', data.address)
        postData.append('contact_button_url', data.contact_button_url);

        console.log(postData.values())

        api.post(`/events?api_token=${api_token}`, postData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then( res => {
            if ( res.status === 201 ) {
                setData(INITIAL_DATA);
                snackbar("Evento cadastrado com sucesso", 6000, true);
            }
            setLoading(false);
        })
        .catch( err => {
            snackbar("Não foi possível criar o evento pôs o servidor retornou um erro crítico.", 6000, false);
            console.error(err);
            setLoading(false);
        })
    }

    function onInputsChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    function onChangeFile(event) {
        setFile(event.target.files[0])
    }

    return (
        <div className={style.container}>
            <h3 className={style.title}>Novo Evento</h3>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justify="flex-start">

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="name"
                            type="text"
                            label="Titulo"
                            variant="outlined"
                            onChange={onInputsChange}
                            value={data.name}
                            size="small"
                            color="secondary"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Endereço"
                            variant="outlined"
                            name="address"
                            type="text"
                            onChange={onInputsChange}
                            value={data.address}
                            size="small"
                            color="secondary"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="URL"
                            name="contact_button_url"
                            type="url"
                            onChange={onInputsChange}
                            value={data.contact_button_url}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Imagem"
                            id="image"
                            name="file"
                            type="file"
                            onChange={onChangeFile}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            fullWidth
                            focused
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Inicio evento"
                            variant="outlined"
                            name="start_at"
                            type="datetime-local"
                            onChange={onInputsChange}
                            value={data.start_at}
                            size="small"
                            color="secondary"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fim evento"
                            variant="outlined"
                            name="end_at"
                            type="datetime-local"
                            onChange={onInputsChange}
                            value={data.end_at}
                            size="small"
                            color="secondary"
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Descrição"
                            name="description"
                            variant="outlined"
                            color="secondary"
                            rows={9}
                            type="text"
                            multiline
                            fullWidth={true}
                            onChange={onInputsChange}
                            value={data.description}
                            required
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                                Cadastrar Evento
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Snackbar open={message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>
        </div>
    )
}
