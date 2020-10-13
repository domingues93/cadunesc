import React, { useState, useEffect } from 'react';

import api from '../api/axios'

import
{
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
    withStyles,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
const useStyle = makeStyles({
    container: {
        width: "95%",
        padding: 10,
    },
    title: {
        fontFamily: "'Roboto Slab', sans-serif" ,
        color: "#5A5A5A",
        marginBottom: 20
    },
    preview: {
        padding: 10,
        height: 300,
        maxHeight: 300,
        overflow: "auto",
        border: "1px solid rgb(173, 146, 50, 50%);",
        boxShadow: "inset 0px 0px 5px 1px #00000040;"
    },
    actions: {
        marginTop: 5,
        "& button":{
            margin: 2
        }
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#262d33",
        color: theme.palette.common.white,
        textTransform: "uppercase"
    },
    body: {
        fontSize: 12,
    }
}))(TableCell);

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState({
        ok: false,
        content: ""
    })

    const style = useStyle()
    useEffect(() => {
        const api_token = localStorage.getItem("cadunesc-token");
        api.get(`/posts?api_token=${api_token}`)
        .then( res => {
            setPosts(res.data);
        })

    }, []);

    function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
    }
    
    function openDialog(id) {
        setSelected(id);
        setOpen(true);
    }

    async function handleOK() {
        setDisabled(true);
        const api_token = localStorage.getItem("cadunesc-token");
        
        try {
            const response = await api.delete(`/posts/${selected}?api_token=${api_token}`);
            if ( response === 204 ) {
                snackbar("Postagem excluida com sucesso!", 5000, true);
            }
        } catch (error) {
            snackbar("Houve um erro e não foi possível excluir a postagem", 5000, false);
        }

        window.location = "/posts";
        setDisabled(false);
        setSelected(0);
        setOpen(false)
    }
    
    function handleClose() {
        setOpen(false);
        setSelected(0);
    }
    return (
        <div className={style.container}>
            <h2 className={style.title}>Postagens</h2>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Lista de Postagens</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!posts.length ? (
                            <TableRow>
                                <StyledTableCell style={{ textAlign: "center" }}>
                                    Não há postagens a serem mostradas.
                                </StyledTableCell>
                            </TableRow>
                        ) : posts?.map(post => (
                            <TableRow key={post.id}>
                                <StyledTableCell>
                                    <h3 className={style.title}>{post.title}</h3>
                                    <div className={style.preview}>
                                        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                    </div>
                                    <div className={style.actions}>
                                        <Button onClick={() => window.location = `/posts/edit/${post.id}`} color="primary" variant="contained" size="small">Editar</Button>
                                        <Button onClick={ ()=> openDialog(post.id) } color="primary" variant="contained" size="small">Excluir</Button>
                                    </div>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Excluir Postagem</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja Realmente excluir essa Postagem {selected}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOK} size="small" color="primary" variant="contained" disabled={disabled}>
                        OK
                    </Button>
                    <Button onClick={handleClose} color="secondary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>
        </div>
    )
}