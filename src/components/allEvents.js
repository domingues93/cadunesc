import React, { useEffect, useState } from 'react';
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
    withStyles
}
from '@material-ui/core';

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
    const style = useStyle();

    useEffect( () => {

        api.get("/events?offset=1&limit=10")
        .then( res => {
            console.log(res);
            if ( res.status === 200 ) {
                setEvents(res.data.data);
                setLoaded(true);
            }
        })
        .catch( err => {
            console.error(err);
        })
    }, []);

    return (
        <Grid container xs={12}>
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
                                    <TableRow hover>
                                        <StyledTableCell>
                                            <Edit />
                                            <Close />
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
                        <CircularProgress />
                    </div>
                )
            }
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
    }
})