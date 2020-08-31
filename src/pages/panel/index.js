import React, { useState, useEffect } from 'react';
import { useHistory, Route } from 'react-router-dom'
import useStyle from './style';
import Logo from '../../storage/logo.png';

import
{
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListItemIcon,
    Hidden
}
from '@material-ui/core';

import
{
    ExpandLess,
    ExpandMore,
    EventAvailable,
    AddCircleOutline,
    List as ListIcon
}
from '@material-ui/icons';


// @components
import FormNewEvents from '../../components/formNewEvent';
import AllEvents from '../../components/allEvents';

import api from '../../api/axios';


export default function Panel() {
    document.title = "Centro Acadêmico de Direito - Painel Admin"
    
    const [open, setOpen] = useState(false);

    const style = useStyle();
    const history = useHistory();

    useEffect(() => {
        
        const api_token = localStorage.getItem("cadunesc-token");
        api.get(`/events?limit=1&offset=1&api_token=${api_token}`)
        .catch( err => {
            history.push("/login");
        })
        
    }, [history]);

    return (
        <div className={style.wrapper}>
            <div className={style.menu}>
                <img
                    src={Logo}
                    alt="CADUNESC"
                />
                <List component="nav" style={{ width: "100%", color: "#FFF" }}>
                    <ListItem onClick={ () => setOpen(!open) } className={ open ? style.active : null}>
                        <ListItemIcon>
                            <EventAvailable style={{ color: "#FFF" }}/>
                        </ListItemIcon>
                        <Hidden only={["xs", "sm"]}>
                            <ListItemText primary="Eventos"/>
                            {open ?  <ExpandLess/> : <ExpandMore/>}
                        </Hidden>
                        
                    </ListItem>

                    <Collapse in={open} timeout="auto" unmountOnExit className={style.subList}>
                        <List component="div" disablePadding>
                           
                            <ListItem button onClick={ () => history.push("/events/new")}>
                                <Hidden only={["md", "lg", "sm"]} >
                                    <AddCircleOutline />
                                </Hidden>
                                <Hidden only="xs">
                                    <ListItemText primary="Novo evento"/>
                                </Hidden>
                            </ListItem>

                            <ListItem button onClick={ () => history.push("/")}>
                                <Hidden only={["md", "lg", "sm"]} >
                                    <ListIcon />
                                </Hidden>
                                <Hidden only="xs">
                                    <ListItemText primary="Todos os eventos"/>
                                </Hidden>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>

            <div className={style.header}>
                <Hidden only="xs">
                    <h1>Centro Acadêmico de Direito</h1>
                </Hidden>
                <Hidden only={["lg", "md", "sm", "xl"]}>
                    <h1>CADUNESC</h1>
                </Hidden>
            </div>

            <div className={style.main}>
                <Route exact path="/events/new">
                    <FormNewEvents />
                </Route>
                <Route exact path="/">
                    <AllEvents />
                </Route>
            </div>    
        </div>

    )
}