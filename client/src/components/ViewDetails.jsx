import "../styles/view-details.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getBookingDetails } from "../services/get-data";
import { Header } from "./Header";

function generateBookingId(date, id) {
    let dateObj = new Date(date);
    let formattedDate = dateObj.getFullYear().toString() +
                        String(dateObj.getMonth() + 1).padStart(2, '0') +
                        String(dateObj.getDate()).padStart(2, '0');
    let formattedId = String(id).padStart(4, '0');
    return `BK-${formattedDate}${formattedId}`;
}

export const ViewDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [booking, setBooking] = useState({
        packagename: "",
        BookingID: "",
        destination: "",
        duration: 0,
        NetPayableAmount: 0,
        FromDate: "",
        BookingDate: "",
        PackageID: "",
        members: [],
        isCancellable : false
    });

    const getDetail = async () => {
        try {
            const res = await getBookingDetails(id);
            console.log(res.data);
            setBooking(res.data.booking || {}); 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDetail();
    }, [id]); 

    return (
        <>
            <Header />
            <div className="view-details-container margin-for-header">
                <div className="details-card">
                    <h1 className="package-title">{booking.packagename || "N/A"}</h1>
                    <p className="booking-id"><strong>Booking ID:</strong> {generateBookingId(booking.BookingDate.split("T")[0],booking.BookingID) || "N/A"}</p>
                    <p className="destination"><strong>Location:</strong> {booking.destination || "N/A"}</p>
                    <p className="duration">
                        <strong>Duration:</strong> {booking.duration ? `${booking.duration}D/${booking.duration - 1}N` : "N/A"}
                    </p>
                    <p className="total-amount"><strong>Total Amount Paid:</strong> ₹{booking.NetPayableAmount || 0}</p>
                    <p className="start-date"><strong>Start Date:</strong> {booking.FromDate.split("T")[0] || "N/A"}</p>
                    <p className="booking-date"><strong>Booking Date:</strong> {booking.BookingDate.split("T")[0] || "N/A"}</p>

                    <h2 className="member-heading">Members Details</h2>
                    <ul className="member-list">
                        {booking.members?.length > 0 ? (
                            booking.members.map((member, index) => (
                                <li key={index} className="member-item">
                                    <span className="member-name">{member.MemberName}</span> 
                                    <span className="member-age">({member.age} yrs, {member.gender})</span>
                                </li>
                            ))
                        ) : (
                            <p>No members available</p>
                        )}
                    </ul>

                    <div className="btn-group">
                        {booking.PackageID && (
                            <NavLink to={`/home/${booking.PackageID}`}>
                                <button className="view-package-btn">View Package</button>
                            </NavLink>
                        )}
                        <button className={`cancel-btn ${booking.isCancellable === false && "hidden"}`} onClick={() => navigate("/")}>Cancel Booking</button>
                    </div>
                </div>
            </div>
        </>
    );
};
