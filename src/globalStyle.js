import { makeStyles, withStyles } from "@material-ui/core";
import { TableCell as MUTableCell } from "@material-ui/core";

export const TableCell = withStyles((theme) => ({
    head: {
        fontSize: 12,
        backgroundColor: "#262d33",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
    },
}))(MUTableCell);

export default makeStyles({
    title: {
        display: "flex",
        alignItems: "center",
        color: "#5A5A5A",
        
        '& h1': {
            fontSize: 22,
            fontFamily: "'Roboto Slab', sans-serif",
            marginLeft: 5
        }
	},
})