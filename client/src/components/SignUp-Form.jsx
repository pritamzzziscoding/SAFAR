import { useState } from "react";
import { signup } from "../services/auth-apis";
import { useNavigate } from "react-router-dom";

export const SignUpForm = ({ type }) => {
    const [formData, setFormData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        phoneno: "",
        password: "",
        confirmpassword: "",
        type,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        try {
            const res = await signup(formData);
            if (res.data.success === true) {
                navigate("/home");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="flex flex-col items-center gap-6 p-3 rounded-xl w-[90%]" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div className="flex flex-col items-center gap-1 text-teal-700 w-[80%]">
                <label className="font-semibold" htmlFor="email">Email</label>
                <input className="shadow-md border-2 border-stone-500 h-10 rounded-full w-full px-3" type="email" name="email" id="email" required autoComplete="on" value={formData.email} onChange={handleChange} />
            </div>

            {/* Name Inputs */}
            <div className="flex flex-col gap-1 text-teal-700 w-[80%]">
                <div className="flex justify-between">
                    <label className="font-semibold" htmlFor="firstname">First Name</label>
                    <label className="font-semibold" htmlFor="lastname">Last Name</label>
                </div>
                <div className="flex justify-between gap-2">
                    <input className="shadow-md border-2 border-stone-500 h-10 rounded-full w-1/2 px-3" type="text" name="firstname" id="firstname" required autoComplete="on" value={formData.firstname} onChange={handleChange} />
                    <input className="shadow-md border-2 border-stone-500 h-10 rounded-full w-1/2 px-3" type="text" name="lastname" id="lastname" required autoComplete="on" value={formData.lastname} onChange={handleChange} />
                </div>
            </div>

            {/* Phone Number Input */}
            <div className="flex flex-col items-center gap-1 text-teal-700 w-[80%]">
                <label className="font-semibold" htmlFor="phoneno">Phone Number</label>
                <input className="shadow-md border-2 border-stone-500 h-10 rounded-full w-full px-3" type="tel" name="phoneno" id="phoneno" required autoComplete="on" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
            </div>

            {/* Password Inputs */}
            <div className="flex flex-col gap-1 text-teal-700 w-[80%]">
                <div className="flex justify-between">
                    <label className="font-semibold" htmlFor="password">Password</label>
                    <label className="font-semibold" htmlFor="confirmpassword">Confirm Password</label>
                </div>
                <div className="flex justify-between gap-2">
                    <input className="shadow-md border-2 border-stone-500 h-10 rounded-full w-1/2 px-3" type="password" name="password" id="password" required autoComplete="on" value={formData.password} onChange={handleChange} />
                    <input className="shadow-md border-2 border-stone-500 h-10 rounded-full w-1/2 px-3" type="password" name="confirmpassword" id="confirmpassword" value={formData.confirm_password} onChange={handleChange} />
                </div>
            </div>

            {/* Submit Button */}
            <button className="font-medium bg-teal-600 rounded text-white shadow-md px-6 py-2 hover:bg-teal-700 transition" type="submit">Sign Up</button>
        </form>
    );
};
