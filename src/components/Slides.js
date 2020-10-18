import React, { useEffect, useState } from 'react';


import api from '../api/axios';

import
{
    Grid,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    withStyles,
    CircularProgress,
    makeStyles,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    TextField,
	Button,
	Snackbar
}
from "@material-ui/core";

import { Pagination, Alert } from '@material-ui/lab';

import
{
    CloudUploadOutlined,
    CloseRounded
}
from "@material-ui/icons";

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


export default function Slides() {
    const [slides, setSlides] = useState({});
    const [loaded, setLoaded] = useState(false);
	const [dialog, setDialog] = useState(false);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [deleteId, setdeleteId] = useState(0);
	const [message, setMessage] = useState("")
	const [page, setPage] = useState({ actual: 1, last: 1 })
	const [formData, setFormData] = useState({});
	const style = useStyle();
	
	// dialog
	const [btnDialog, setBtnDialog] = useState(false);
    
    useEffect( () => {
        const api_token = localStorage.getItem("cadunesc-token");
        api.get(`/sliders?api_token=${api_token}&page=1&limit=8`)
            .then( res => {
                if ( res.status === 200 ) {
                    setSlides(res.data)
                    setLoaded(true);
                }
            })
    }, []);

    function onChangePage(event, newPage) {
		if ( newPage === page.actual )return;

		setLoaded(false);

		const api_token = localStorage.getItem("cadunesc-token");
        api.get(`/sliders?api_token=${api_token}&page=${newPage}&limit=8`)
            .then( res => {
                if ( res.status === 200 ) {
					setSlides(res.data)
					setLoaded(true);
                }
            })
	}
	
	function onSubmitSlide(e) {
		e.preventDefault()

		setBtnDialog(true)

		const api_token = localStorage.getItem("cadunesc-token");
		const data = new FormData();
		
		// dados do formulário
		data.append("caption", formData.caption);
		data.append("file", formData.file)
		data.append("action_url", formData.action_url);

		api.post(`/sliders?api_token=${api_token}`, data)
		.then( res => {
			if ( res.status === 200 ) {
				setDialog(false);
				snackbar("Slide adicionado com sucesso!", 6000, true);
			}
			window.location = window.location;
		})
		.catch( err => {
			snackbar("Não foi possível adicionar a imagem no slide.", 6000, false);
			setDialog(false);
		})
	}

	function onChangeCaption(event) {
		if ( event.target.type === "file") {
			setFormData({ ...formData, [event.target.name]: event.target.files[0], fileValue: event.target.value })
		}else {
			setFormData({ ...formData, [event.target.name]: event.target.value })
		}
	}

    function onDeleteSlide() {
		setBtnDialog(true);
		setLoaded(false);

		const api_token = localStorage.getItem("cadunesc-token");
		api.delete(`/sliders/${deleteId}?api_token=${api_token}`)
		.then( res => {
			if ( res.status === 204 ) {
				setBtnDialog(false);
				setDeleteDialog(false);
				setLoaded(true);
				snackbar("Slide deletado com sucesso!", 6000, true);
				window.location = window.location;
			}
		}).catch( err => {
			setBtnDialog(false);
			setDeleteDialog(false);
			setLoaded(true);
			snackbar("Houve um erro e não foi possível deletar o slide.", 6000, false);
		});
	}
	
	function snackbar(message, time, ok) {
        setMessage({ ok, content: message });
        setTimeout( () => {
            setMessage({ ok: false, content: ""});
        }, time);
	}
	
    return (
        <div>
            <h3 className={style.title}>Slides</h3>
            <Grid container>
				<div onClick={() => setDialog(true) } className={style.add} title="Enviar novo documento">
					<CloudUploadOutlined />
					<span>Enviar documento</span>
				</div>
				
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>Ação</StyledTableCell>
								<StyledTableCell>Arquivo</StyledTableCell>
								<StyledTableCell>Preview</StyledTableCell>
								<StyledTableCell>Criado em</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
						
							{ loaded ? 
							slides.map( (slide, key) =>(
								<TableRow key={key}>
									<StyledTableCell onClick={() => {
										setdeleteId(slide.id)
										setDeleteDialog(true);
									}} >
											<CloseRounded style={{ cursor: "pointer" }}/>
									</StyledTableCell>
									<StyledTableCell> 
										<a href={slide.action_url} target="_blank" rel="noopener noreferrer">{slide.caption}</a>
									</StyledTableCell>
									<StyledTableCell>
										<img src={slide.image} alt="preview" width={128} />
									</StyledTableCell>
									<StyledTableCell>{slide.created_at || "sem data"}</StyledTableCell>
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
				<Pagination
					color="primary"
					count={page.last}
					page={page.actual}
					onChange={onChangePage}
					showFirstButton
					showLastButton
				/>
			</Grid>

            <Dialog
				open={dialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				onClose={ () => setDialog(false) }
			>
				<form onSubmit={onSubmitSlide}>
				<DialogTitle id="alert-dialog-title">Novo Slide</DialogTitle>
				
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						
							<TextField
								className={style.input}
								label="Titulo"
								name="caption"
								type="text"
								variant="outlined"
								color="secondary"
								size="small"
								onChange={onChangeCaption}
								value={formData.caption}
								required
							/>
							
							<TextField
								className={style.input}
								name="file"
								type="file"
								variant="outlined"
								color="secondary"
								onChange={onChangeCaption}
								value={formData.fileValue}
								required
							/>

                            <TextField
								className={style.input}
								label="URL"
								name="action_url"
								type="url"
								variant="outlined"
								color="secondary"
								size="small"
								onChange={onChangeCaption}
								value={formData.action_url}
								required
							/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color="primary" variant="contained" size="small" type="submit" disabled={btnDialog}>Enviar</Button>
					<Button size="small" autoFocus onClick={() => setDialog(false) }>Cancelar</Button>
				</DialogActions>
				</form>
			</Dialog>

			<Dialog
				open={deleteDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				onClose={ () => setDeleteDialog(false) }
			>
				<DialogTitle id="alert-dialog-title">Deletar Slide</DialogTitle>
				
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Deseja realmente deletar o slide ?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button size="small" color="primary" variant="contained" type="submit" onClick={onDeleteSlide} disabled={btnDialog}>Deletar</Button>
					<Button size="small" autoFocus onClick={() => setDeleteDialog(false) }>Cancelar</Button>
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