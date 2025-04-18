import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const addBlog = (formData) => {
    const res = api.post("/add-blog", formData, {
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return res
}


export const addPackage = (formData) => {
    const res = api.post("/add-package", formData, {
        headers : {
            "Content-Type" : "multipart/form-data"
        }
    })
    return res
}

export const getFilteredPackage = (filterData) => {
    const res = api.post("/filter-package", filterData)
    return res
}

export const giveRating = (body) => {
    const res = api.post("/rating", body)
    return res
}
