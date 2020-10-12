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
    Hidden,
    Button
}
from '@material-ui/core';

import
{
    ExpandLess,
    ExpandMore,
    Person,
    EventAvailable,
    AddCircleOutline,
    NoteAdd,
    List as ListIcon,
    Description as DescriptionIcon,
    PhotoLibrary,
    ImageSearch,
    PostAdd,
    Reorder
}
from '@material-ui/icons';


// @components
import FormNewEvents from '../../components/formNewEvent';
import AllEvents from '../../components/allEvents';
import Documents from '../../components/documents';
import Slides from '../../components/Slides';
import AddPost from '../../components/Post';
import Posts from '../../components/allPosts';
import api from '../../api/axios';
import UpdateEvent from '../../components/updateEvent';


const ListMenu = [
    {
        name: "Eventos",
        icon: <EventAvailable />,
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
        icon: <DescriptionIcon />,
        subMenu: [{
            name: "Documento",
            url: "/documents",
            icon: <NoteAdd style={{ marginRight: 5 }}/>
        }]
    },{
        name: "Slides",
        icon: <PhotoLibrary />,
        subMenu: [
            {
                name: "Slide",
                url: "/slides",
                icon: <ImageSearch style={{ marginRight: 5 }}/>
            }
        ]
    },{
        name: "Postagens",
        icon: <Reorder/>,
        subMenu: [{
            name: "Nova Postagem",
            url: "/postagens/add",
            icon: <PostAdd style={{ marginRight: 5 }}/>
        },{
            name: "Postagem",
            url: "/postagens",
            icon: <PostAdd style={{ marginRight: 5 }}/>
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

    function LogOut() {
        localStorage.removeItem('cadunesc-token');

        history.push("/login");
    }

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
                    <span>
                        <div><Person style={{ marginRight: 5 }}/></div>
                        <div>{localStorage.getItem("cadunesc-name") ?? "No Name"}</div>
                    </span>
                    <h1>Centro Acadêmico de Direito</h1>
                </Hidden>
                <Hidden only={["lg", "md", "sm", "xl"]}>
                    <h1>CADUNESC</h1>
                </Hidden>
                <Button title="deslogar-se do painel" onClick={LogOut} variant="outlined" color="primary">Sair</Button>
            </div>

            <div className={style.main}>
                
                <Route exact path="/events/add">
                    <FormNewEvents />
                </Route>

                <Route exact path="/events">
                    <AllEvents />
                </Route>

                <Route exact path="/event/:id" >
                    <UpdateEvent/>
                </Route>

                <Route exact path="/documents">
                    <Documents />
                </Route>
                <Route exact path="/slides">
                    <Slides />
                </Route>
                <Route exact path="/postagens/add">
                    <AddPost />
                </Route>
                <Route exact path="/postagens">
                    <Posts />
                </Route>
            </div>    
        </div>

    )
}