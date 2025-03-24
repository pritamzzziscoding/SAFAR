import { NavLink } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";

export const Header = () => {
    return <header className="bg-gradient-to-r from-stone-200 via-stone-50 to-stone-200 home-header w-full flex justify-between items-center h-15 shadow-2xl fixed top-0 left-0">
        <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent">SAFAR</span>
        <span>
            <ul className="flex gap-5">
                <li><NavLink to={"/home"}>Home</NavLink></li>
                <li><NavLink to={"/bookings"}>Bookings</NavLink></li>
                <li><NavLink to={"/review"}>Reviews</NavLink></li>
                <li><NavLink to={"/home"}>Logout</NavLink></li>
            </ul>
            <ul>
                <GiHamburgerMenu />
            </ul>
        </span>
    </header>
}