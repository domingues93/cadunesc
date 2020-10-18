import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import
{
    Grid,
    TextField,
    Button,
    makeStyles,
    Snackbar
}
from '@material-ui/core';

import { Alert } from '@material-ui/lab';
import { ArrowBack  } from '@material-ui/icons';

import api from '../api/axios';


const INITIAL_DATA = {
    name: "",
    address: "",
    url: "",
    description: "",
    start_at: "2000-01-01T00:00",
    end_at: "2000-01-01T23:59"
}

const useStyle = makeStyles({
    container:{
        width: "95%"
    },
    title: {
        margin: "25px 0",
        fontFamily: "'Roboto Slab', sans-serif" ,
        color: "#5A5A5A",
    },
    goBack: {
        cursor: "pointer",
        marginTop: 10
    }
});

// yyyy-MM-ddThh:mm
export default function UpdateEvent() {

    const { id } = useParams();
    const history = useHistory();
    const style = useStyle();
    const [loaded, setLoaded] = useState(false);
    const [changed, setChanged] = useState(false);
    const [message, setMessage] = useState({
        ok: false,
        content: ""
    })
    const [event, setEvent] = useState(INITIAL_DATA);
    const [file, setFile] = useState();
    
    useEffect( () => {
        const api_token = localStorage.getItem('cadunesc-token');
        api.get(`/events/${id}/?api_token=${api_token}`)
        .then( res => {
            if ( res.status === 200 ) {
                res.data.start_at = moment(res.data.start_at, 'DD/MM/YYYY HH:mm:SS', true).format("YYYY-MM-DDTHH:mm:ss")
                res.data.end_at = moment(res.data.end_at, 'DD/MM/YYYY HH:mm:SS', true).format("YYYY-MM-DDTHH:mm:ss")
                setEvent(res.data);
                setLoaded(true);
            }
        })
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        
        setLoaded(false);
        setChanged(false);

        const postData = new FormData();

        postData.append('file', file);
        postData.append('name', event.name)
        postData.append('start_at', event.start_at)
        postData.append('end_at', event.end_at)
        postData.append('description', event.description)
        postData.append('address', event.address)

        const api_token = localStorage.getItem('cadunesc-token');
        api.put(`/events/${id}?api_token=${api_token}`, event)
        .then( res => {
            if ( res.status === 200 )
            {
                console.log(res.data);
                if ( res.data.description.length ){
                    snackbar("Não foi possível atualizar o evento pôs a descrição esta muito grande.", 6000, false);
                    return;
                }

                snackbar("Evento atualizado com sucesso!", 6000, true);
            }
        })
        .catch( error => {
            snackbar("Erro crítico, não foi possível atualizar o evento.", 6000, false);
        })
    }

    function onInputsChange(e) {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
        setChanged(true);
    }
    function onChangeFile(event) {
        setFile(event.target.files[0])
    }

    function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
    }

    return (

        <Grid container className={style.container}>
            <Grid item className={style.goBack} onClick={() => history.goBack() }>
                <ArrowBack />
            </Grid>
            <form onSubmit={handleSubmit}>
                <h1 className={style.title}>Atualizar Evento</h1>
                <Grid container spacing={2} justify="flex-start">

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="name"
                            type="text"
                            label="Titulo"
                            variant="outlined"
                            onChange={onInputsChange}
                            value={event.name}
                            size="small"
                            color="secondary"
                            required
                            fullWidth
                            disabled={!loaded}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Endereço"
                            variant="outlined"
                            color="secondary"
                            name="address"
                            type="text"
                            onChange={onInputsChange}
                            value={event.address}
                            size="small"
                            fullWidth
                            disabled={!loaded}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="URL"
                            color="secondary"
                            name="URL"
                            type="url"
                            onChange={onInputsChange}
                            value={event.url}
                            variant="outlined"
                            size="small"
                            disabled={!loaded}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Imagem"
                            id="image"
                            color="secondary"
                            name="image"
                            type="file"
                            onChange={onChangeFile}
                            focused
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Inicio evento"
                            variant="outlined"
                            color="secondary"
                            name="start_at"
                            type="datetime-local"
                            onChange={onInputsChange}
                            value={event.start_at}
                            size="small"
                            fullWidth
                            disabled={!loaded}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fim evento"
                            variant="outlined"
                            color="secondary"
                            name="end_at"
                            type="datetime-local"
                            onChange={onInputsChange}
                            value={event.end_at}
                            size="small"
                            fullWidth
                            disabled={!loaded}
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
                            value={event.description}
                            disabled={!loaded}
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!changed}
                        >
                                Atualizar Evento
                        </Button>
                    </Grid>
                </Grid>
            </form>
            
            <Snackbar open={message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>
        </Grid>
    )
}