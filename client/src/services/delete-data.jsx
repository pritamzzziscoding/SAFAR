import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const deleteBlog = (body) => {
    const res = api.delete("/delete-blog", body)
    return res
}