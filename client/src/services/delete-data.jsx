import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const deleteBlog = (body) => {
    console.log(body)
    const res = api.delete("/delete-blog", {data : body})
    return res
}

export const deletePackage = (body) => {
    console.log(body)
    const res = api.delete("/delete-package", {data : body})
    return res
}