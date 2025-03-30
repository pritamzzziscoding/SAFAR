import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const updateImage = (body) =>{
    const res = api.put("/update-image", body,{
        headers: {
            "Content-Type" : "multipart/form-data",
        }
    });
    return res
}

export const updateName = (body) => {
    const res = api.put("/update-name", body);
    return res
}

export const updatePassword = (body) => {
    const res = api.put("/update-password", body)
    return res
}

export const updateBlog = (body) => {
    const res = api.put("/update-blog", body)
    return res
}

export const togglePackage = (body) => {
    const res = api.put("/toggle-package", body)
    return res
}