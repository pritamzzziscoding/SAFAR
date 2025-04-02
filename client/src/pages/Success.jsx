import { NavLink, useParams } from "react-router-dom";
import "../styles/Success.css"; // Margins & Paddings CSS
import { FaCheckCircle } from "react-icons/fa";

export const Success = () => {

    const {reference} = useParams()
    return (
        <div className="success-page bg-gradient-to-br from-teal-500 to-teal-800 text-white flex flex-col items-center justify-center h-screen">
        <FaCheckCircle className="text-6xl text-green-400 animate-bounce" />
        <h1 className="text-2xl sm:text-3xl font-semibold mt-4 text-center">Payment Successful!</h1>
        <p className="sm:text-lg mt-2 text-center">Your package has been booked successfully.</p>
        <p className="sm:text-lg mt-2 text-center">Transaction ID : {reference}</p>
        <NavLink to="/home" className="back-home-btn bg-teal-800 rounded-md hover:shadow-2xl">
            Back to Home
        </NavLink>
        </div>
    );
};
