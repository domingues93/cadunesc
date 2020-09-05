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
	CircularProgress
}
from "@material-ui/core";
import api from '../api/axios';
import { CloseRounded, CloudUploadOutlined } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';

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
	const [documents, setDocuments] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [page, setPage] = useState({
		actual: 1,
		last: 1
	});
	const [file, setFile] = useState({
		name: "",
		archive: ""
	})
	useEffect( () => {
		const api_token = localStorage.getItem('cadunesc-token');
		api.get(`/documents?api_token=${api_token}&limit=10&offset=${page.actual}`)
		.then( res => {
			setPage({
				last: res.data.last_page
			})
			setDocuments(res.data.data);
			setLoaded(true);
		} )
	}, [])

	function uploadFile(event) {
		event.preventDefault();

		console.log(file);
	}
	
	function changeFormValues(event) {
		const { name, value } = event.target;
		setFile({ ...file, [name]: value })
	}

	function closeDialog() {
		setFile({ archive: "", name: "" })
		setDialog(false);
	}

	function onChangePage(event, newPage) {
		if ( newPage == page.actual )return ;
		setLoaded(false);

        const api_token = localStorage.getItem('cadunesc-token');
        api.get(`/documents?offset=${newPage}&limit=10&api_token=${api_token}`)
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
	return (
		<div>
			<h1 className={style.title}>Documentos</h1>
			<Grid container>
			
				<div onClick={() => setDialog(true) } className={style.add} title="Enviar novo documento">
					<CloudUploadOutlined/>
					<span>Enviar documento</span>
				</div>
				
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
									<StyledTableCell><CloseRounded /></StyledTableCell>
									<StyledTableCell>
										<a href={document.url} target="_blank">{document.title}</a>
									</StyledTableCell>
									<StyledTableCell>{document.created_at}</StyledTableCell>
								</TableRow>
							)) :
								<TableRow>
									<div className={style.progress}>
										<CircularProgress />
									</div>
								</TableRow>
							}
							
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination count={page.last} size="small" page={page.actual} onChange={onChangePage} />
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
								name="name"
								type="text"
								variant="outlined"
								size="small"
								onChange={changeFormValues}
								value={file.name}
								required
							/>
							
							<TextField
								className={style.input}
								name="archive"
								type="file"
								variant="outlined"
								helperText="Permitido apenas PDF"
								onChange={changeFormValues}
								value={file.archive}
								required
							/>

					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button type="submit" color="primary">Enviar</Button>
					<Button color="secondary" autoFocus onClick={closeDialog}>Cancelar</Button>
				</DialogActions>
				</form>
			</Dialog>
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