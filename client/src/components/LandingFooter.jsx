import { NavLink } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
import { useState } from "react";

export const LandingFooter = () => {
    return <footer className="landing-footer bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 text-green-50">
        <p className="text-center text-xl font-medium footer-title">🌍 SAFAR – Your Travel Partner</p>
            <div className="grid grid-cols-2 sm:grid-cols-3">
                    <ul className="place-self-center">
                        <p className="font-medium text-lg">Quick Links</p>
                        <li className="text-sm"><NavLink>About</NavLink></li>
                        <li className="text-sm"><NavLink>Contact</NavLink></li>
                        <li className="text-sm"><NavLink>FAQ</NavLink></li>
                        <li className="text-sm"><NavLink>Terms & Conditions</NavLink></li>
                    </ul>
                    <ul className="place-self-center" >
                        <p className="font-medium text-lg">Follow us</p>
                        <li className="text-xl"><NavLink><FaInstagram className="" /></NavLink></li>
                        <li className="text-xl"><NavLink><FaYoutube /></NavLink></li>
                        <li className="text-xl"><NavLink><FaXTwitter /></NavLink></li>
                        <li className="text-xl"><NavLink><FaFacebook /></NavLink></li>
                    </ul>
                <div className="footer-subscribe mg-auto col-span-2 sm:col-span-1 w-[95%]">
                    <SubscribeForm />
                    <p>Subscribe our newsletter <br /> to get regular updates</p>
                </div>
            </div>
        <div>
            <p className="text-center footer-title">Support: <span>support@safar.com</span></p>
            <div className="bg-teal-50 h-0.5 w-[80%] mg-auto"></div>
            <p className="text-center footer-title">© 2025 SAFAR. All Rights Reserved.</p>
        </div>
    </footer>
}

const SubscribeForm = () =>{
    const[email, setEmail] = useState({
        email: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(email)
        setEmail("")
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setEmail({...email, [name] : value})
    }

    return <form className="flex shadow w-[100%]" onSubmit={handleSubmit}>
        <input className="w-[100%] subscribe bg-teal-50 text-teal-900 text-sm" type="email" name="email" id="email" value={email.email} onChange={handleChange}/>
        <button className="bg-teal-600 font-medium subscribe text-white border-teal-800 flex items-center">Subscribe</button>
    </form>
}