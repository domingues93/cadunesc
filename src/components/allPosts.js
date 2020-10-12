import React, { useState, useEffect } from 'react';

import api from '../api/axios'

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
} from '@material-ui/core';

const useStyle = makeStyle({

});

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

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const style = useStyle()
    useEffect(() => {
        api.get("/posts")
        .then( res => {
            console.log(res);
        })
    }, []);
    return (
        <div>
            <TableContainer className={style.root}>
                <h3 className={style.title}>Eventos</h3>
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
                            <TableRow hover key={posts.id}>
                                <StyledTableCell>
                                    <Link className={style.icon} to={`/event/${posts.id}`}>
                                        <Edit />
                                    </Link>
                                    
                                    <Link className={style.icon} to="#" onClick={() => setDialog({ eventId: event.id, open: true, message: "Deseja mesmo excluir esse evento?", title: event.name })}>
                                        <Close />
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell>{posts.name}</StyledTableCell>
                                <StyledTableCell>{posts.start_at}</StyledTableCell>
                                <StyledTableCell>{posts.end_at}</StyledTableCell>
                                <StyledTableCell>{posts.description}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}