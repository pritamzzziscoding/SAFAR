import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})


export const updateImage = (body) =>{
    const res = api.put("/update-image", body);
    return res
}

export const updateName = (body) => {
    const res = api.put("/update-name", body);
    return res
}