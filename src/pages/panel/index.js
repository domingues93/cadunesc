import React, { useState } from 'react';
import { useHistory, Route } from 'react-router-dom'
import useStyle from './style';
import Logo from '../../storage/logo.png';

import
{
    Grid,
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListItemIcon
}
from '@material-ui/core';

import
{
    ExpandLess,
    ExpandMore,
    EventAvailable
}
from '@material-ui/icons';

export default function Panel() {
    document.title = "Centro Acadêmico de Direito - Painel Admin"
    
    const [open, setOpen] = useState(false);

    const style = useStyle();
    const history = useHistory();

    return (
        <Grid container className={style.wrapper}>
            <Grid component="header" className={style.appBar} spacing={3}>
                <img
                    className={style.logo}
                    src={Logo}
                    alt="CADUNESC"
                />
            </Grid>
            <Grid component="nav" className={style.navigation}>
            <List component="nav" style={{ width: "100%", color: "#FFF" }}>
                <ListItem onClick={ () => setOpen(!open) } className={ open ? style.active : null}>
                    <ListItemIcon>
                        <EventAvailable style={{ color: "#FFF" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Eventos"/>
                    {open ?  <ExpandLess/> : <ExpandMore/>}
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit className={style.subList}>
                    <List component="div" disablePadding>
                        <ListItem button onClick={ () => history.push("/events/new")}>
                                <ListItemText primary="Novo evento"/>
                        </ListItem>
                        <ListItem button onClick={ () => history.push("/")}>
                            <ListItemText primary="Todos os eventos"/>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            </Grid>
            <Grid className={style.container} component="div">
                <Route path="/events/new">
                    Novo evento
                </Route>

                <Route exact path="/">
                    Listar Todos os Eventos
                </Route>
            </Grid>
        </Grid>
    )
}