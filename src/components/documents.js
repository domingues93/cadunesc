import React, { useState, useEffect } from 'react';

import
{
	Grid,
	Table,
	TableContainer,
	TableRow,
	TableCell,
	TableHead,
	TableBody,
	withStyles,
	makeStyles,
	Button,
	// dialog
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	TextField,
	CircularProgress,
	Snackbar
}
from "@material-ui/core";
import api from '../api/axios';
import { CloseRounded, CloudUploadOutlined } from '@material-ui/icons';
import { Pagination, Alert } from '@material-ui/lab';

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

export default function Documents() {
	const style = useStyle();
	const [dialog, setDialog] = useState(false);

	const [dialogDocument, setDialogDocument] = useState({
		id: 0,
		open: false,
		title: ""
	});
	
	const [documents, setDocuments] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [page, setPage] = useState({
		actual: 1,
		last: 1
	});
	const [upDisable, setUpDisable] = useState(false);

	const [title, setTitle] = useState("");
	const [file, setFile] = useState("");
	const [message, setMessage] = useState({
        ok: false,
        content: ""
	});
	
	useEffect( () => {
		const api_token = localStorage.getItem('cadunesc-token');
		api.get(`/documents?api_token=${api_token}&limit=8&offset=${page.actual}`)
		.then( res => {
			setPage({
				actual: res.data.current_page,
				last: res.data.last_page
			})
			setDocuments(res.data.data);
			setLoaded(true);
		} )
	}, [page.actual])

    function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
    }
	
	function uploadFile(event) {
		event.preventDefault();
		
		setUpDisable(true);

		const data = new FormData();
		data.append('file', file);
		data.append('title', title)

		const api_token = localStorage.getItem('cadunesc-token');
		
		api.post(`/documents?api_token=${api_token}`, data, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
		.then( res => {
			if ( res.status == 201 ) {
				setLoaded(false);
				api.get(`/documents?offset=1&limit=10&api_token=${api_token}`)
				.then( res => {
					if ( res.status === 200 ) {
						setDocuments(res.data.data);
						setPage({
							actual: 1,
							last: res.data.last_page
						});
						setLoaded(true);
						setDialog(false);
						setUpDisable(false);
						setTitle("");

						snackbar("Arquivo enviado com sucesso!", 6000, true);
					}
				})
				.catch( err => {
					console.error(err);
					snackbar("Não foi possivel enviar o arquivo.", 6000, false);
					setLoaded(true);
					setDialog(false);
					setUpDisable(false);
					setTitle("");
				})
			}
			
		})
		.catch( error => {
			setDialog(false);
			setUpDisable(false);
			console.error(error);
		})
	}
	
	function onChangeTitle(event) {
		setTitle(event.target.value);
	}

	function onChangeFile(event) {
		setFile(event.target.files[0])
	}

	function closeDialog() {
		setDialog(false);
		setFile("");
		setTitle("");
	}

	function onChangePage(event, newPage) {
		
		if ( newPage === page.actual )return ;
		setLoaded(false);

        const api_token = localStorage.getItem('cadunesc-token');
        api.get(`/documents?offset=${newPage}&limit=8&api_token=${api_token}`)
        .then( res => {
            if ( res.status === 200 ) {
                setDocuments(res.data.data);
                setPage({
                    actual: newPage,
                    last: res.data.last_page
				});
				setLoaded(true);
            }
        })
        .catch( err => {
            console.error(err);
        })
	}

	/** component dialog delete document */
	function DialogDeleteDocument() {
		
		return (
			<Dialog
				open={dialogDocument.open}
				aria-labelledby="document-delete-dialog-title"
				aria-describedby="document-delete-dialog-description"
				onClose={onDialogDocumentClose}
			>
				<DialogTitle id="document-delete-dialog-title">Confirme essa ação.</DialogTitle>
				<DialogContent>
					<DialogContentText id="document-delete-dialog-description">
						Dejesa deletar o documento {dialogDocument.title}?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onDialogDocumentOK}>excluir</Button>
					<Button onClick={onDialogDocumentClose} autoFocus>cancelar</Button>
				</DialogActions>
			</Dialog>
		)
	}

	function onDialogDocumentOK() {
		const { id } = dialogDocument;

		setLoaded(false);

		const api_token = localStorage.getItem('cadunesc-token')
		api.delete(`/documents/${id}?api_token=${api_token}`)
			.then( ({ status }) => {
				if ( status === 204 ) {
					api.get(`/documents?offset=1&limit=10&api_token=${api_token}`)
						.then( res => {
							if ( res.status === 200 ) {
								setDocuments(res.data.data);
								setPage({
									actual: 1,
									last: res.data.last_page
								});
								setLoaded(true);
								snackbar("Arquivo deletado com sucesso!", 6000, true);
							}
						})
						.catch( err => {
							console.error(err);
							setLoaded(true);
							snackbar("O arquivo foi excluido, pórem não foi possível atualizar a lista de arquivos cadastrados.", 6000, false);
						})
				}
			})
			.catch( err => {
				console.error(err);
				snackbar("Não foi possível deletar o arquivo.", 6000, false);
				setLoaded(true);
			})
			setDialogDocument({
				id: 0,
				open: false,
				title: ""
			});
	}

	function onDialogDocumentClose() {
		setDialogDocument(false);
	}

	return (
		<div>
			<DialogDeleteDocument />
			<h3 className={style.title}>Documentos</h3>
			<Grid container>
				<Grid item>
					<div onClick={() => setDialog(true) } className={style.add} title="Enviar novo documento">
						<CloudUploadOutlined/>
						<span>Enviar documento</span>
					</div>
				</Grid>
				<Grid item xs={12} style={{ margin: "10px 0" }}>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<StyledTableCell>Ação</StyledTableCell>
									<StyledTableCell>Arquivo</StyledTableCell>
									<StyledTableCell>Criado em</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
							
								{ loaded ? 
								documents.map( (document, key) =>(
									<TableRow key={key}>
										<StyledTableCell
											onClick={ () => setDialogDocument({ id: document.id, open: true, title: `deseja realmente deletar o documento ${document.title}` }) }
										>
												<CloseRounded style={{ cursor: "pointer" }}/>
										</StyledTableCell>
										<StyledTableCell>
											<a href={document.url} target="_blank" rel="noopener noreferrer">{document.title}</a>
										</StyledTableCell>
										<StyledTableCell>{document.created_at}</StyledTableCell>
									</TableRow>
								)) :
									<TableRow>
										<div className={style.progress}>
											<CircularProgress color="secondary"/>
										</div>
									</TableRow>
								}
								
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item style={{ padding: "10px" }}>
					<Pagination
						color="primary"
						count={page.last}
						page={page.actual}
						onChange={onChangePage}
						showFirstButton
						showLastButton
					/>
				</Grid>
			</Grid>

			<Dialog
				open={dialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				onClose={closeDialog}
			>
				<form onSubmit={uploadFile}>
				<DialogTitle id="alert-dialog-title">Enviar Documento</DialogTitle>
				
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						
							<TextField
								className={style.input}
								label="Nome do arquivo"
								name="title"
								type="text"
								variant="outlined"
								color="secondary"
								size="small"
								onChange={onChangeTitle}
								value={title}
								required
							/>
							
							<TextField
								className={style.input}
								id="file"
								name="file"
								type="file"
								variant="outlined"
								color="secondary"
								helperText="Permitido apenas arquivos em PDF"
								onChange={onChangeFile}
								required
							/>

					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button type="submit" disabled={upDisable}>Enviar</Button>
					<Button autoFocus onClick={closeDialog}>Cancelar</Button>
				</DialogActions>
				</form>
			</Dialog>

			<Snackbar open={message.content ? true : false} autoHideDuration={5000}>
                <Alert severity={ message.ok ? "success" : "error"}>
                    {message.content}
                </Alert>
            </Snackbar>
		</div>
	)
}


const useStyle = makeStyles({
	title: {
		marginTop: 15,
        fontFamily: "'Roboto Slab', sans-serif",
        color: "#5A5A5A",
        marginBottom: 20
	},
	add: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		cursor: "pointer",
		'& span': {
			fontFamily: "'Roboto Slab', sans-serif",
			fontSize: 12,
			marginLeft: 5
		}
	},
	input: {
		marginBottom: 20
	},
	progress: {
		display: "flex",
		width: "100%",
		height: 100,
		justifyContent: "center",
		alignItems: "center"
	}
})