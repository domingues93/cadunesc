import { makeStyles } from '@material-ui/core';



const useStyle = makeStyles({
    wrapper: {
        background: "#EEE",
        height: "100vh"
    },
    appBar: {
        width: "100%",
        height: 50,
        background: "#262d33"
    },
    logo: {
        paddingTop: 5,
        marginLeft: 50,
        width: 32
    },
    navigation: {
        width: "15%",
        height: "91%",
        background: "#262d33",
        paddingTop: 10,
    },
    active:{
        background: "#00BBFF"
    },
    subList:{
        backgroundColor: "#383f44",
        "& span" :{
            fontSize: "11px",
        }
    },
    container: {
        padding: 5
    }
})
export default useStyle;