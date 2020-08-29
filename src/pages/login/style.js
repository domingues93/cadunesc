import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    form:{
        marginTop: 20,
        width: '20%'
    }
})
export default useStyles;