import { NavLink } from "react-router-dom"
import { LoginForm } from "../components/Login-Form"

export const Login = () =>{
    return <div className="bg-sky-100 grid md:grid-cols-2">
        <div className="flex flex-col">
            <h1>Login as a Tourist</h1>
            <LoginForm type="tourist" />
        </div>
        <div>
            <h1>Login as a Tourist</h1>
            <LoginForm type="agency" />
        </div>
    </div>
}