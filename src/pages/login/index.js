import React, { useState } from 'react';
import useStyle from './style';

import
{
    TextField,
    Grid,
    Button,
    Hidden,
    useMediaQuery
}
from '@material-ui/core';

import
{
    AccountCircle,
    Lock
}
from '@material-ui/icons';

// storage image
import Logo from '../../storage/logo.png';

export default function Login() {
    document.title = "Centro Acadêmico de Direito - Login"
    const style = useStyle();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const mediaQuery = useMediaQuery("(min-width:600px)");
    console.log(mediaQuery);
    
    function onSubmit( event ) {
        event.preventDefault();

        alert(`username: ${username}\n\nPassword: ${password}`);
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
                                onChange={ (e) => setUsername(e.target.value)}
                                value={username}
                                label="Usuário"
                                name="username"
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
                    >
                        Conectar
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}