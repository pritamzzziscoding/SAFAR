import { NavLink, useParams } from "react-router-dom";
import "../styles/Success.css"; // Margins & Paddings CSS
import { FaTimesCircle } from "react-icons/fa";

export const Failure = () => {
  const { reference } = useParams();

  return (
    <div className="failure-page text-white flex flex-col items-center justify-center h-screen">
      <FaTimesCircle className="text-6xl text-red-500 animate-pulse" />
      <h1 className="text-2xl sm:text-3xl font-semibold mt-4 text-center text-red-900">Payment Failed!</h1>
      <p className="sm:text-lg mt-2 text-center text-red-800">Oops! Something went wrong while processing your payment.</p>
      <p className="sm:text-lg mt-2 text-center text-red-800">Transaction ID: {reference}</p>
      <NavLink to="/home" className="back-home-btn bg-red-700 text-white rounded-md hover:shadow-xl transition-all">
        Back to Home
      </NavLink>
    </div>
  );
};
