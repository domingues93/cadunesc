import React, { useEffect, useState } from 'react';

/*
$validator = Validator::make($request->all(), [
            'caption' => 'required',
            'image' => 'required',
            'action_url' => 'required'
        ]);
*/

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
    Button
}
from "@material-ui/core";

import { Pagination } from '@material-ui/lab';

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
    const [page, setPage] = useState({ actual: 1, last: 1 })
    const style = useStyle();
    
    useEffect( () => {
        const api_token = localStorage.getItem("cadunesc-token");
        api.get(`/sliders?api_token=${api_token}`)
            .then( res => {
                if ( res.status === 200 ) {
                    setSlides(res.data)
                    setLoaded(true);
                }
            })
    }, []);

    function onChangePage(event, newPage) {

    }

    function onDeleteSlide(){

    }

    return (
        <div>
            <h1 className={style.title}>Slides</h1>
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
								<StyledTableCell>Criado em</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
						
							{ loaded ? 
							slides.map( (slide, key) =>(
								<TableRow key={key}>
									<StyledTableCell
										onClick={onDeleteSlide}
									>
											<CloseRounded style={{ cursor: "pointer" }}/>
									</StyledTableCell>
									<StyledTableCell>
										<a href={slide.url} target="_blank" rel="noopener noreferrer">{document.title}</a>
									</StyledTableCell>
									<StyledTableCell>{slide.created_at}</StyledTableCell>
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
				<Pagination color="primary" count={page.last} page={page.actual} onChange={onChangePage} />
			</Grid>

            <Dialog
				open={dialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				onClose={ () => setDialog(false) }
			>
				<form>
				<DialogTitle id="alert-dialog-title">Enviar Documento</DialogTitle>
				
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						
							<TextField
								className={style.input}
								label="Titulo"
								name="title"
								type="text"
								variant="outlined"
								color="secondary"
								size="small"
								required
							/>
							
							<TextField
								className={style.input}
								name="Imagem"
								type="file"
								variant="outlined"
								color="secondary"
								helperText="Permitido apenas PDF"
								required
							/>

                            <TextField
								className={style.input}
								label="URL"
								name="title"
								type="text"
								variant="outlined"
								color="secondary"
								size="small"
								required
							/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button type="submit" style={{ color: "#00BBFF" }}>Enviar</Button>
					<Button autoFocus onClick={() => setDialog(false) } style={{ color: "#FF6600" }}>Cancelar</Button>
				</DialogActions>
				</form>
			</Dialog>
        </div>
    )
}