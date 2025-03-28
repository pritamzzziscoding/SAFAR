import { useState } from "react";
import { login } from "../services/auth-apis";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ type }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    type: type,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await login(data);
    if (res.data.success === true) {
      navigate("/blogs");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <form
      className="login-form flex flex-col justify-evenly h-[65%] gap-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label
          className="bg-clip-text text-transparent font-semibold bg-gradient-to-r from-teal-800 via-teal-500 to-teal-800 lg:text-xl"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="text-teal-800 lg:text-xl border-3 rounded-lg border-cyan-50 w-[90%] h-13"
          type="email"
          name="email"
          id="email"
          required
          value={data.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="bg-clip-text text-transparent font-semibold bg-gradient-to-r from-teal-800 via-teal-500 to-teal-800 lg:text-xl"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="text-teal-800 lg:text-xl border-3 rounded-lg border-cyan-50 w-[90%] h-13"
          type="password"
          name="password"
          id="password"
          required
          value={data.password}
          onChange={handleChange}
        />
      </div>

      <button
        className="w-20 bg-gradient-to-tr from-teal-700 via-teal-600 to-teal-700 font-medium text-sky-50 rounded-lg"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};
