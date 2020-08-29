import React, { useState } from 'react';
import useStyle from './style';

import
{
    TextField,
    Grid,
    Button,
    Hidden
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

    function onSubmit( event ) {
        event.preventDefault();

        alert(`username: ${username}\n\nPassword: ${password}`);
    }

    return (
        <div className={style.wrapper}>
            <img
                src={Logo}
                alt="Centro Acadêmico de Direito"
            />
            <form className={style.form} onSubmit={onSubmit}>
                <Grid container spacing={1} alignItems="flex-end" style={{ margin: "10px 0" }}>
                    <Hidden only={["sm", "md"]}>
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
                            required
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" style={{ margin: "10px 0" }}>
                    <Hidden only={["sm", "md"]}>
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
                            required
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Conectar
                </Button>
            </form>
        </div>
    )
}