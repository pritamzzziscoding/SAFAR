import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../styles/Headers.css";
import { Profile } from "../pages/Profile";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleImageClick = () => {
        setProfileOpen(prev => !prev)
    }

    return (
        <header className="header bg-gradient-to-r from-stone-200 via-stone-50 to-stone-200 home-header w-full flex justify-between items-center h-15 shadow-2xl fixed top-0 left-0">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent italic">SAFAR</span>
            <span className="flex items-center gap-5">
                {/* Hamburger Icon */}
                <ul className="hamburger text-3xl" onClick={toggleMenu}>
                    <GiHamburgerMenu />
                </ul>
                {/* Menu Items */}
                <ul className={`text-teal-700 font-medium flex text-md gap-5 menu ${isMenuOpen ? 'close' : 'open'}`}>
                    <li><NavLink to={"/packages"}>Packages</NavLink></li>
                    <li><NavLink to={"/home"}>Home</NavLink></li>
                    <li><NavLink to={"/bookings"}>Bookings</NavLink></li>
                    <li><NavLink to={"/blogs"}>Blogs</NavLink></li>
                    <li></li>
                </ul>
                <img onClick={handleImageClick} className="cursor-pointer h-10 w-10 bg-amber-300 rounded-full border-amber-500 border-2" src="123" alt="." />
            </span>
            <Profile status = {profileOpen == false ? 'close-profile' : 'open-profile slide-down'}/>
        </header>
    );
};


