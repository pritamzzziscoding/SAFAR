import axios from "axios"

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