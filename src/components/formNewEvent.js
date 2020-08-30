import React, { useState } from 'react';
import
{
    Grid,
    Input,
    InputLabel,
    TextField,
    Button,
    makeStyles,
    Snackbar
}
from '@material-ui/core';
import { Alert } from "@material-ui/lab";

const useStyle = makeStyles({
    root: {
        paddingTop: 10,
        width: "100%"
    },
    title: {
        fontFamily: "'Roboto Slab', sans-serif" ,
        color: "#5A5A5A",
        width: "100%",
        height: 100,
        marginLeft: 50,
    },
    form: {
        width: "100%",
        marginLeft: 50
    },
    inputDescription: {
        width: "100%",
        "& input": {
            border: "1px solid #000"
        }
    },
});

const d = new Date();
const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

const INITIAL_DATA = {
    name: "",
    address: "",
    description: "",
    image: "",
    start_at: `${year}-${month}-${day}T00:00`,
    end_at: `${year}-${month}-${day}T23:59`
}

export default function FormNewEvent() {
    
    const style = useStyle();
    const [data, setData] = useState(INITIAL_DATA);
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

        fetch("https://cadunesc.diego-gomes.com.br/api/events", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
        .then( res => {
            setLoading(false);
            if ( res.status === 200 && res.ok ) {
                setData(INITIAL_DATA);
                snackbar("Evento cadastrado com sucesso", 6000, true);
            }
        })
        .catch( err => {
            setLoading(false);
            snackbar("Não foi possível criar o evento.", 6000, false);
            console.error(err);
        })
    }

    function onInputsChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    return (
        <div className={style.root}>
            <h1 className={style.title}>Novo Evento</h1>
            <form onSubmit={handleSubmit}  className={style.form}>
                <Grid container spacing={4}>
                    <Grid item xs={1} sm={3}>
                        <TextField
                            name="name"
                            type="text"
                            label="Titulo"
                            variant="outlined"
                            onChange={onInputsChange}
                            value={data.name}
                        />
                    </Grid>

                    <Grid item xs={1} sm={3}>
                        <TextField
                            label="Endereço"
                            variant="outlined"
                            name="address"
                            type="text"
                            onChange={onInputsChange}
                            value={data.address}
                        />
                    </Grid>

                    <Grid item xs={1} sm={3}>
                        <InputLabel htmlFor="init-event">Inicio evento</InputLabel>
                        <Input
                            id="init-event"
                            name="start_at"
                            type="datetime-local"
                            onChange={onInputsChange}
                            value={data.start_at}
                        />
                    </Grid>

                    <Grid item xs={1} sm={3}>
                        <InputLabel htmlFor="end-event">Fim evento</InputLabel>
                        <Input
                            id="end-event"
                            name="end_at"
                            type="datetime-local"
                            onChange={onInputsChange}
                            value={data.end_at}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={10}>
                    <Grid item>
                        <TextField
                            label="URL"
                            id="image"
                            name="image"
                            type="url"
                            onChange={onInputsChange}
                            value={data.image}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={10}>
                    <Grid item className={style.inputDescription}>
                        <TextField
                            label="Descrição"
                            name="description"
                            variant="outlined"
                            rows={9}
                            type="text"
                            multiline
                            fullWidth={true}
                            onChange={onInputsChange}
                            value={data.description}
                        />
                    </Grid>
                </Grid>

                <Grid container xs spacing={10}>
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

            <Snackbar open={ message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>
        </div>
    )
}