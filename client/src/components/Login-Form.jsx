import { useState } from "react"

export const LoginForm = ({type}) => {
    const[data, setData] = useState({
        email: "",
        password: "",
        type: type
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data, [name] : value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(data)
    }

    return <div>
        <form className="bg-amber-100 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input className="bg-amber-50" type="email" name="email" id="email" required value={data.email} onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required value={data.password} onChange={handleChange}/>

            <button type="submit">Login as {type}</button>
        </form>
    </div>
}