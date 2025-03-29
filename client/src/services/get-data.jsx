import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getBlog = (formData) => {
    const res = api.get("blogs")
    return res
}