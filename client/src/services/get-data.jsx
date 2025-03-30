import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getBlog = () => {
    const res = api.get("blogs")
    return res
}

export const Like = (body) => {
    const res = api.post("/like", body)
    return res
}

export const checkLike = (BlogID) => {
    const res = api.get(`/currentLike/${BlogID}`)
    return res
}

export const getAgencyPackage = () => {
    const res = api.get("/agency-packages")
    return res
}