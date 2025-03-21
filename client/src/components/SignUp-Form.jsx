import { useState } from "react"

export const SignUpForm = ({type}) => {
    const[formData, setFormData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        confirm_password:"",
        type: type
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name] : value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData)
    }

    return <form className="flex flex-col" onSubmit={handleSubmit}>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required autoComplete="on" value={formData.email} onChange={handleChange}/>

        <label htmlFor="firstname">First Name</label>
        <input type="text" name="firstname" id="firstname" required autoComplete="on" value={formData.firstname} onChange={handleChange}/>

        <label htmlFor="lastname">Last Name</label>
        <input type="text" name="lastname" id="lastname" required autoComplete="on" value={formData.lastname} onChange={handleChange}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required autoComplete="on" value={formData.password} onChange={handleChange}/>

        <label htmlFor="confirm_password">Confirm Password</label>
        <input type="password" name="confirm_password" id="confirm_password" value={formData.confirm_password} onChange={handleChange}/>

        <button type="submit">Sign Up as {type}</button>

    </form>
}