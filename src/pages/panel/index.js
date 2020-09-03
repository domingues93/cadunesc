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
    NoteAdd,
    List as ListIcon,
    Description as DescriptionIcon
}
from '@material-ui/icons';


// @components
import FormNewEvents from '../../components/formNewEvent';
import AllEvents from '../../components/allEvents';
import Documents from '../../components/documents';

import api from '../../api/axios';


const ListMenu = [
    {
        name: "Eventos",
        icon: <EventAvailable style={{ color: "#FFF" }}/>,
        subMenu: [{
                name: "Criar Evento",
                url: "/events/add",
                icon: <AddCircleOutline style={{ marginRight: 5 }}/>

            },{
                name: "Listar Eventos",
                url: "/events",
                icon: <ListIcon style={{ marginRight: 5 }}/>
            }
        ]
    },{
        name: "Documentos",
        icon: <DescriptionIcon style={{ color: "#FFF" }}/>,
        subMenu: [{
            name: "Enviar Documento",
            url: "/documents/add",
            icon: <NoteAdd style={{ marginRight: 5 }}/>
        }]
    }
]

export default function Panel() {
    document.title = "Centro Acadêmico de Direito - Painel Admin"
    
    const [menuOpened, setMenuOpened] = useState({
        menu: -1
    });

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
                    {ListMenu.map( (menu, key) => (
                        <div key={key}>
                        <ListItem onClick={ () => setMenuOpened({ menu: ( menuOpened.menu === key ? -1 : key  ) }) } className={ menuOpened.menu === key ? style.active : null}>
                            <ListItemIcon>
                                {menu.icon}
                            </ListItemIcon>
                            <Hidden only={["xs", "sm"]}>
                                <ListItemText primary={menu.name} />
                                {menuOpened.menu === key ? <ExpandMore/> : <ExpandLess/>}
                            </Hidden>
                            
                        </ListItem>

                        <Collapse in={menuOpened.menu === key} timeout="auto" unmountOnExit className={style.subList}>
                            <List component="div" disablePadding>
                                {menu.subMenu.map( (subMenu, key) => (
                                    <ListItem key={key} button onClick={ () => history.push(subMenu.url)}>
                                        <Hidden only={["md", "sm"]} >
                                            {subMenu?.icon}
                                        </Hidden>
                                        <Hidden only="xs">
                                            <ListItemText primary={subMenu.name}/>
                                        </Hidden>
                                    </ListItem>
                                ))}

                            </List>
                        </Collapse>
                        </div>
                    ))}
                    
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
                <Route exact path="/events/add">
                    <FormNewEvents />
                </Route>
                <Route exact path="/events">
                    <AllEvents />
                </Route>

                <Route exact patch="/documents/add">
                    <Documents />
                </Route>
            </div>    
        </div>

    )
}