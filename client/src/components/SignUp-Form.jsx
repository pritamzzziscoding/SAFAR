import { useState } from "react"

export const SignUpForm = ({type}) => {
    const[formData, setFormData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirm_password:"",
        type
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name] : value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData)
    }

    return <form className="flex flex-col items-center gap-5 md:text-xl" onSubmit={handleSubmit}>

        <div className="flex flex-col items-center gap-1 text-teal-700 w-[80%]">
            <label className="font-semibold" htmlFor="email">Email</label>
            <input className="shadow-2xl border-2 border-blue-50 h-9 rounded w-[90%]" type="email" name="email" id="email" required autoComplete="on" value={formData.email} onChange={handleChange}/>
        </div>
        <div className="flex flex-col gap-1 text-teal-700">
            <div className="flex justify-between">
                <label className="font-semibold" htmlFor="firstname">First Name</label>
                <label className="font-semibold" htmlFor="lastname">Last Name</label>
            </div>
            <div className="flex justify-evenly">
                <input className="shadow-2xl border-2 border-blue-50 h-9 rounded w-[48%]" type="text" name="firstname" id="firstname" required autoComplete="on" value={formData.firstname} onChange={handleChange}/>
                <input className="shadow-2xl border-2 border-blue-50 h-9 rounded w-[48%]" type="text" name="lastname" id="lastname" required autoComplete="on" value={formData.lastname} onChange={handleChange}/>
            </div>
        </div>
        <div className="flex flex-col gap-1 text-teal-700">
            <div className="flex justify-between">
                <label className="font-semibold" htmlFor="password">Password</label>
                <label className="font-semibold" htmlFor="confirm_password">Confirm Password</label>
            </div>
            <div className="flex justify-evenly">
                <input className="shadow-2xl border-2 border-blue-50 h-9 rounded w-[48%]" type="password" name="password" id="password" required autoComplete="on" value={formData.password} onChange={handleChange}/>
                <input className="shadow-2xl border-2 border-blue-50 h-9 rounded w-[48%]" type="password" name="confirm_password" id="confirm_password" value={formData.confirm_password} onChange={handleChange}/>                
            </div>
        </div>


        <button className="font-medium bg-teal-600 rounded text-blue-50 shadow-4xl" type="submit">Sign Up</button>
    </form>
}