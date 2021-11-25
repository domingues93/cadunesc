import React from "react";
import
{
    TableContainer,
    Table, 
    TableHead,
    TableRow,
    TableBody
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab"


// @icons
import { MenuBook as MenuBookIcon } from "@material-ui/icons";

// @styles
import useStyle from "./style";
import useGlobalStyle, { TableCell } from "../../../globalStyle";


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

    return (
        <div>
            <div className={globalStyle.title}>
                <MenuBookIcon />
                <h1>Postagens do Jornal</h1>
            </div>
            
            <div className={style.wrapper}>
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