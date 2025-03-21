import { NavLink } from "react-router-dom"
import { SignUpForm } from "../components/SignUp-Form"

export const SignUp = () =>{
    return <div className="bg-sky-100 grid md:grid-cols-2">
        <div>
            <SignUpForm type="tourist"/>
        </div>
        <div>
        <SignUpForm type="agency" />
        </div>
    </div>
}