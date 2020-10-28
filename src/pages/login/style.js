import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    wrapper: {
        background: theme.palette.primary.light,
        width: "100vw",
        height: "100vh"
    },
    
    form: {
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#FFF",
        borderRadius: 5,
        padding: 15,
        boxShadow: `0px 0px 2px 0px ${theme.palette.secondary.dark}`,
        
        '& form': {
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    },

    logo: {
        width: 128,
        height: 128,
        marginBottom: 80
    },

    input: {
        width: "100%",
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        width: "100%"
    }
}))
export default useStyles;