import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useStyle from './style';

import
{
    TextField,
    Grid,
    Button,
    Hidden,
    useMediaQuery,
    Snackbar
}
from '@material-ui/core';

import { Alert } from "@material-ui/lab";

import
{
    AccountCircle,
    Lock
}
from '@material-ui/icons';

//
import api from '../../api/axios';

// storage image
import Logo from '../../storage/logo.png';

export default function Login() {
    document.title = "Centro Acadêmico de Direito - Login"
    const style = useStyle();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState({
        ok: false,
        content: ""
    })

    const mediaQuery = useMediaQuery("(min-width:600px)");
    
    function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
    }

    useEffect(() => {
        const api_token = localStorage.getItem("cadunesc-token");
        api.get(`/events?limit=1&offset=1&api_token=${api_token}`)
        .then( ( { data } ) => {
            if ( data?.data )
            {
                history.push("/");
            }
        });
        
    }, [history]);


    function onSubmit( event ) {
        event.preventDefault();
        
        setDisabled(true);

        api.post("/login", {
            email,
            password
        })
        .then( response => {
            if ( response.status === 200 ) {
                
                const { api_token } = response.data;

                localStorage.setItem("cadunesc-token", api_token);
                snackbar("login efetuado com sucesso. redirecionando...", 5000, true);

                setTimeout(() => {
                    history.push("/");
                }, 6000);
                
            } else {
                setDisabled(false);
            }
            
        }).catch( err => {
            if ( err ) {
                setDisabled(false);
                snackbar("Não foi possível efetuar o login, por favor tente novamente.", 5000, false);
            }
        });
    }

    return (
        <Grid container className={style.wrapper}>
            <Grid item xs={12} className={style.logo}>
                <img
                    src={Logo}
                    alt="Centro Acadêmico de Direito"
                    width={200}
                />
            </Grid>

            <Grid container item xs={12} className={style.gridForm}>
                <form onSubmit={onSubmit}>
                    <Grid container item spacing={1} alignItems="flex-end" style={{ margin: "10px 0" }}>
                        <Hidden only={["xs", "sm"]}>
                            <Grid item>
                                <AccountCircle color="primary"/>
                            </Grid>
                        </Hidden>
                        <Grid item>
                            <TextField
                                onChange={ (e) => setEmail(e.target.value)}
                                value={email}
                                label="Email"
                                name="email"
                                type="text"
                                color="primary"
                                fullWidth={true}
                                required
                                style={{ width:  mediaQuery ? "20vw" : "55vw"}}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item spacing={1} alignItems="flex-end" style={{ margin: "10px 0" }}>
                        <Hidden only={["xs", "sm"]}>
                            <Grid item>
                                <Lock color="primary" />
                            </Grid>
                        </Hidden>
                        <Grid item>
                            <TextField
                                onChange={ (e) => setPassword(e.target.value)}
                                label="Senha"
                                name="password"
                                type="password"
                                color="primary"
                                fullWidth={true}
                                required
                                style={{ width:  mediaQuery ? "20vw" : "55vw"}}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={{ width:  mediaQuery ? "22.6vw" : "57vw"}}
                        disabled={disabled}
                    >
                        Conectar
                    </Button>
                </form>
            </Grid>
            <Snackbar open={message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>
        </Grid>
    )
}