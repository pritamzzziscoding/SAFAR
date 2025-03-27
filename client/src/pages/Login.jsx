import { NavLink } from "react-router-dom"
import { LoginForm } from "../components/Login-Form"

export const Login = () =>{
    return <div className="login-page bg-sky-100 grid lg:grid-cols-2 p-24">
        <div className="login-form-container z-10 flex flex-col justify-evenly h-[90%] lg:h-[60%] w-[85%] md:w-[70%] lg:w-[85%] xl:w-[80%] place-self-center rounded-3xl border-4 border-blue-50/50 bg-blue-50/50 shadow-2xl">
            <h1 className="text-2xl md:text-4xl bg-clip-text text-transparent font-bold bg-gradient-to-r from-teal-800 via-teal-500 to-teal-800 h-12">Login as Tourists</h1>
            <LoginForm type="tourist" />
        </div>

        <div className="login-form-container z-10 flex flex-col justify-evenly h-[90%] lg:h-[60%] w-[85%] md:w-[70%] lg:w-[85%] xl:w-[80%] place-self-center rounded-3xl border-4 border-blue-50/50 bg-blue-50/50 shadow-2xl">
            <h1 className="text-2xl md:text-4xl bg-clip-text text-transparent font-bold bg-gradient-to-r from-teal-800 via-teal-500 to-teal-800 h-12">Login as Agency</h1>
            <LoginForm type="agency" />
        </div>
    </div>
}