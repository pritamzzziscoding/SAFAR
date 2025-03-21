import { NavLink } from "react-router-dom"

export const Landing = () => {
    return <header className="home-header flex justify-between items-center h-15 bg-sky-50">
        <span className="text-3xl font-bold text-blue-950">SAFAR</span>
        <span className="flex gap-5">
            <NavLink to="/login-page"><button>Login</button></NavLink>
            <NavLink to="/sign-page"><button>Sign-Up</button></NavLink>
        </span>
    </header>
} 