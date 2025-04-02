import axios from "axios";

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getBlog = () => {
    const res = api.get("/blogs")
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

export const getIndividualPackageDetails = ({params}) => {
    console.log(params)
    const res = api.get(`/get-package/${params.packageID}`)
    return res
}

export const getTouristBookings = () => {
    const res = api.get("/tourist-bookings")
    return res
}

//getting bookings detail for tourist to see their details
export const getBookingDetails = (id) => {
    const res = api.get(`/tourist-bookings/${id}`)
    return res
}

//getting bookings for agency
export const getBookingsForAgency = (id) => {
    const res = api.get(`/package-bookings/${id}`)
    return res
}

//
export const getPackageReviews = (id) => {
    const res = api.get(`/package-reviews/${id}`)
    const res = api.get(`/package-bookings/${id}`)
    return res
}