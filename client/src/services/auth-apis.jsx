import axios from "axios"

const api = axios.create({
    baseURL: "/auth"
})

export const login = (body) => {
    const res = api.post("/login", body)
    return res;
}