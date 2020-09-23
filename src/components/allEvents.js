import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import
{
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    makeStyles,
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Snackbar,

}
from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';

import { Edit, Close } from '@material-ui/icons';

import api from '../api/axios';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#262d33",
        color: theme.palette.common.white,
        textTransform: "uppercase"
    },
    body: {
        fontSize: 12,
    },
}))(TableCell);


export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [page, setPage] = useState({
        actual: 1,
        last: 1
    });

    const [message, setMessage] = useState({
        ok: false,
        content: ""
    })
    const [dialog, setDialog] = useState({
        eventId: 0,
        open: false,
        message: "",
        title: ""
    })

    const style = useStyle();

    useEffect( () => {
        const api_token = localStorage.getItem('cadunesc-token');
        api.get(`/events?offset=1&limit=8&api_token=${api_token}`)
        .then( res => {
            if ( res.status === 200 ) {
                setEvents(res.data.data);
                setPage({
                    actual: 1,
                    last: res.data.last_page
                })
                setLoaded(true);
            }
        })
        .catch( err => {
            console.error(err);
        })
    }, []);

    function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
    }

    function handleClose() {
        
        setDialog({
            open: false,
            message: "",
            title: ""
        })
    }

    function handleOK() {
        
        setLoaded(false);

        const api_token = localStorage.getItem('cadunesc-token');

        api.delete(`/events/${dialog.eventId}?api_token=${api_token}`)
        .then( response => {
            
            api.get(`/events?offset=1&limit=10&api_token=${api_token}`)
            .then( res => {
                if ( res.status === 200 ) {
                    setEvents(res.data.data);
                    snackbar("Evento deletado com sucesso!", 6000, true);
                }
            })
            .catch( err => {
                snackbar("Não foi possível excluir o evento, por favor tente mais tarde.", 6000, false);
                console.error(err);
            })
        
            setLoaded(true);
        }).catch( err => {
            snackbar("Não foi possível excluir o evento, por favor tente mais tarde.", 6000, false);
            setLoaded(true);
        })
        
        // fechar dialog
        setDialog({
            eventId: 0,
            open: false,
            message: "",
            title: ""
        })
    }

    function onChangePage(event, newPage) {

        if ( newPage === page.actual )return;
        
        setLoaded(false);
        
        const api_token = localStorage.getItem('cadunesc-token');
        api.get(`/events?offset=${newPage}&limit=8&api_token=${api_token}`)
        .then( res => {
            if ( res.status === 200 ) {
                setEvents(res.data.data);
                setPage({
                    actual: newPage,
                    last: res.data.last_page
                });
                setLoaded(true);
            }
        })
        .catch( err => {
            console.error(err);
            setLoaded(true);
        })
    }
    return (
        <Grid container>
            {loaded ?
                (
                    <TableContainer className={style.root}>
                        <h1 className={style.title}>Eventos</h1>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Ações</StyledTableCell>
                                    <StyledTableCell>Titulo</StyledTableCell>
                                    <StyledTableCell>Inicio Evento</StyledTableCell>
                                    <StyledTableCell>Fim Evento</StyledTableCell>
                                    <StyledTableCell>Descrição</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events?.map(event => (
                                    <TableRow hover key={event.id}>
                                        <StyledTableCell>
                                            <Link className={style.icon} to={`/event/${event.id}`}>
                                                <Edit />
                                            </Link>
                                            
                                            <Link className={style.icon} to="#" onClick={() => setDialog({ eventId: event.id, open: true, message: "Deseja mesmo excluir esse evento?", title: event.name })}>
                                                <Close />
                                            </Link>
                                        </StyledTableCell>
                                        <StyledTableCell>{event.name}</StyledTableCell>
                                        <StyledTableCell>{event.start_at}</StyledTableCell>
                                        <StyledTableCell>{event.end_at}</StyledTableCell>
                                        <StyledTableCell>{event.description}</StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                    </TableContainer>
                ):

                (
                    <div className={style.progress}>
                        <CircularProgress color="secondary"/>
                    </div>
                )
            }
            <Pagination
                color="primary"
                count={page.last}
                page={page.actual}
                onChange={onChangePage}
                showLastButton
                showFirstButton
            />

            <Snackbar open={message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>

            <Dialog
                open={dialog.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialog.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOK} color="primary">
                        OK
                    </Button>
                    <Button onClick={handleClose} color="secondary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

const useStyle = makeStyles({
    root: {
        width: "100%",
        padding: 10,
    },
    title: {
        fontFamily: "'Roboto Slab', sans-serif" ,
        color: "#5A5A5A",
        marginBottom: 20
    },
    progress: {
        width: "100%",
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        color: "#212121",
        transition: "200ms",
        "& svg": {
            fontSize: 20,
        },
        "&:hover": {
            opacity: "0.8"
        }
    }
})