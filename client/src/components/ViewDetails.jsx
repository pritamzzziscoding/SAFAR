import "../styles/view-details.css"; // Import updated CSS
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingDetails } from "../services/get-data";

export const ViewDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const[booking, setBooking] = useState({})

    const getDetail = async () => {
        try {
            const res = await getBookingDetails(id)
            setBooking(res.data.booking)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getDetail()
    },[])

    return (
        <div className="view-details-container">
            <div className="details-card">
                <h1 className="package-title">{booking.packagename}</h1>
                <p className="booking-id"><strong>Booking ID:</strong> {booking.BookingID}</p>
                <p className="destination"><strong>Location:</strong> {booking.Destination || "NOT got"}</p>
                <p className="duration"><strong>Duration:</strong> {booking.duration} D / {booking.duration - 1} N</p>
                <p className="total-amount"><strong>Total Amount Paid:</strong> ₹{booking.NetPayableAmount}</p>
                <p className="start-date"><strong>Start Date:</strong> {booking.FromDate.split("T")[0]}</p>
                <p className="booking-date"><strong>Booking Date:</strong> {booking.BookingDate.split("T")[0]}</p>

                <h2 className="member-heading">Members Details</h2>
                <ul className="member-list">
                    {booking.Members.map((member, index) => (
                        <li key={index} className="member-item">
                            <span className="member-name">{member.MemberName}</span> 
                            <span className="member-age">({member.age} yrs, {member.gender})</span>
                        </li>
                    ))}
                </ul>

                <div className="btn-group">
                    <NavLink to={`/home/${booking.PackageID}`}></NavLink>
                    <button className="view-package-btn" >View Package</button>
                    <button className="cancel-btn" onClick={() => navigate("/")}>Cancel Booking</button>
                </div>
            </div>
        </div>
    );
};
