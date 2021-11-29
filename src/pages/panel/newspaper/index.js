import React from "react";
import { useHistory } from "react-router-dom";
import
{
    TableContainer,
    Table, 
    TableHead,
    TableRow,
    TableBody,
    Button
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab"


// @icons
import { MenuBook as MenuBookIcon, PostAdd as PostAddIcon, DeleteForever as DeleteIcon } from "@material-ui/icons";

// @styles
import useStyle from "./style";
import useGlobalStyle, { TableCell } from "../../../globalStyle";

import api from "../../../api/axios";

// @fake data
const data = [
    {
        id: 1,
        title: "Primeira postagem",
        document: "a",
        created_at: "10/10/2021 as 21:00"
    },{
        id: 2,
        title: "Segunda postagem",
        document: "a",
        created_at: "10/10/2021 as 21:00"
    },{
        id: 3,
        title: "Terceira postagem",
        document: "a",
        created_at: "10/10/2021 as 21:00"
    },{
        id: 4,
        title: "Quarta postagem",
        document: "a",
        created_at: "10/10/2021 as 21:00"
    },
]

export default function NewsPaper() {
    const style = useStyle();
    const globalStyle = useGlobalStyle();
    const history = useHistory();

    async function onDeleteNotice(id) {
        const result = window.confirm("Deseja deletar essa noticia ?" + id);
        if ( result ) {
            await api.delete(`/newspaper/${id}`);
        }
    }
    return (
        <div>
            <div className={globalStyle.title}>
                <MenuBookIcon />
                <h1>Postagens do Jornal</h1>
            </div>
            
            <div className={style.wrapper}>
                <Button
                    style={{ marginBottom: 20 }}
                    color="primary"
                    variant="contained"
                    size="small"
                    startIcon={<PostAddIcon/>}
                    onClick={ () => history.push(`${history.location.pathname}/add`) }
                >
                    Nova noticia
                </Button>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Titulo</TableCell>
                                <TableCell>Arquivo</TableCell>
                                <TableCell>Data da postagem</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map( item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.document}</TableCell>
                                    <TableCell>{item.created_at}</TableCell>
                                    <TableCell>
                                        <DeleteIcon
                                            onClick={() => onDeleteNotice(item.id) }
                                            style={{ fontSize: 22, cursor: "pointer" }}
                                            titleAccess="Deletar a noticia"/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    style={{ marginTop: 10 }}
                    count={data.length}
                    page={1}
                    showFirstButton
					showLastButton
                />
            </div>
        </div>
    )
}