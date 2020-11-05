import axios from 'axios';


export default axios.create({
    //baseURL: "https://cadunesc.diego-gomes.com.br/api",
    baseURL: "https://cadunesc.com.br/api",
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }
})