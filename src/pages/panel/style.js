import { makeStyles } from '@material-ui/core';

// color: 262d33

const useStyle = makeStyles({
    
    wrapper: {
        maxHeight: "100vh",
        maxWidth: "100vw",
        display: "grid",
        gridTemplateColumns: "15vw 85vw",
        gridTemplateRows: "8vh 90vh 2vh",
        gridTemplateAreas: '"menu header header"' +
                           '"menu main main"' +
                           '"menu main main"'
    },
    header: {
        background: "#262d33",
        gridArea: "header",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& h1": {
            color: "#FFF",
            fontFamily: "'Roboto Slab', sans-serif",
            fontSize: 22
        }
    },
    menu: {
        background: "#262d33",
        gridArea: "menu",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& img": {
            width: 64
        },
    },
    subList: {
        backgroundColor: "#383f44",
        "& span" :{
            fontSize: "11px",
        }
    },
    main: {
        //background: "#000",
        gridArea: "main",
        paddingLeft: 30,
        overflow: "auto"
    },
    active: {
        background: "#213a50"
    }
})
export default useStyle;