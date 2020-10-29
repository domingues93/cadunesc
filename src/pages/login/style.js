import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    wrapper: {
        background: theme.palette.primary.light,
        width: "100vw",
        height: "100vh"
    },
    
    form: {
        width: props => props.desktop ? "30%" : "80%" ,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#FFF",
        borderRadius: 5,
        padding: 15,
        boxShadow: `0px 0px 1px 0px ${theme.palette.secondary.dark}`,
        
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
    button: {
        width: "100%"
    }
}))
export default useStyles;