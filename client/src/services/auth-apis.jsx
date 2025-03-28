import axios from "axios"

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const login = (body) => {
    const res = api.post("/login", body)
    return res;
}

export const logout = () => {
    const res = api.get("/logout")
    return res
}

export const signup = (body) => {
    const res = api.post("/signup", body);
    return res
}

export const details = () => {
    const res = api.get("/details");
    return res
}