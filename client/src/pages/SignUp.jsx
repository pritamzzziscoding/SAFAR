import { NavLink } from "react-router-dom"
import { SignUpForm } from "../components/SignUp-Form"

export const SignUp = () =>{
    return <div className="signup-page grid md:grid-cols-2">
        <div className="flex flex-col justify-evenly items-center z-10 h-[90%] md:h-[60%] w-[90%] border-4 border-blue-50/50 bg-blue-50/80 rounded-2xl shadow-2xl place-self-center">
            <p className="text-2xl bg-clip-text text-transparent font-bold bg-gradient-to-r from-teal-950 via-teal-600 to-teal-800 text-center md:text-4xl h-12">Signup as Tourists</p>
            <SignUpForm type="tourist"/>
        </div>
        <div className="flex flex-col justify-evenly items-center z-10 h-[90%] md:h-[60%] w-[90%] border-4 border-blue-50/50 bg-blue-50/80 rounded-2xl shadow-2xl place-self-center">
            <p className="text-2xl bg-clip-text text-transparent font-bold bg-gradient-to-r from-teal-950 via-teal-600 to-teal-800 text-center md:text-4xl h-12">Signup as Agency</p>
            <SignUpForm type="agency" />
        </div>
    </div>
}