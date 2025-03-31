import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../styles/Headers.css";
import { Profile } from "../pages/Profile";
import { CheckToken } from "../services/CheckToken";
import { checkCookie, details } from "../services/auth-apis";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [detail, setDetail] = useState({})
    const navigate = useNavigate()
    const getCookieStatus = async () => {
      try {
        const res = await checkCookie();
        if(res.data.success === false){
          navigate("/")
        }else{
          console.log("Badiya hai cookie is set")
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      getCookieStatus()
    },[])

    const[image, setImage] = useState({
        image: null
    })

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleImageClick = () => {
    setProfileOpen((prev) => !prev);
  };

    const getDetail = async () => {
        try {
            const t = await details()
            if(t.data.success === true){
                setDetail(t.data.result)
            }else{
                alert(t.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDetail()
    },[image])

    return (
        <header className="z-20 header bg-gradient-to-r from-stone-200 via-stone-50 to-stone-200 home-header w-full flex justify-between items-center h-15 shadow-2xl fixed top-0 left-0">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent italic">SAFAR</span>
            <span className="flex items-center gap-5">
                {/* Hamburger Icon */}
                <ul className="hamburger text-3xl" onClick={toggleMenu}>
                    <GiHamburgerMenu />
                </ul>
                {/* Menu Items */}
                <ul className={`text-teal-700 font-medium flex text-md gap-5 menu ${isMenuOpen ? 'close' : 'open'}`}>
                    <li><NavLink to={"/blogs"}>Blogs</NavLink></li>
                    <li><NavLink to={`${detail.type === "tourist" ? "/home" : "/packages"}`}>{`${detail.type === "tourist" ? "Home" : "Packages"}`}</NavLink></li>
                    {detail.type == "tourist" && <li><NavLink to={"/bookings"}>Bookings</NavLink></li>}
                </ul>
                <img onClick={handleImageClick} className="cursor-pointer h-10 w-10 bg-amber-300 rounded-full border-amber-500 border-2" src={detail.image_url} alt="." />
            </span>
            <Profile image={image} setImage={setImage} status = {profileOpen == false ? 'close-profile' : 'open-profile slide-down'}/>
            {/* <CheckToken /> */}
        </header>
    );
};
