import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CheckToken = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get('token')
        if(!token){
            navigate("/")
        }   
    }, [navigate])

    return null
}