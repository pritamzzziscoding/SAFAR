import { NavLink } from "react-router-dom"

export const LandingHeader = () => {
    return <header className="bg-gradient-to-r from-stone-200 via-stone-50 to-stone-200 home-header w-full flex justify-between items-center h-15 shadow-2xl fixed top-0 left-0">
        <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent">SAFAR</span>
        <span className="flex gap-3 justify-between items-center">
            <div className="bg-teal-100/30 rounded-md">
                <NavLink to="/login-page"><button className="w-20 h-10 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent font-bold rounded-md border-2 border-teal-600">Login</button></NavLink>
            </div>
            <div className="bg-teal-100/30 rounded-md">
                <NavLink to="/sign-page"><button className="w-25 h-10 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent font-bold rounded-md border-2 border-teal-600">Sign Up</button></NavLink>
            </div>
        </span>
    </header>
} 