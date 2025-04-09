import "../styles/view-details.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getBookingDetails } from "../services/get-data";
import { Header } from "./Header";
import { cancelBooking } from "../services/update";

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
        FromDate: "2025-04-24T18:30:00.000Z",
        BookingDate: "2025-04-24T18:30:00.000Z",
        PackageID: "",
        members: [],
        isCancellable : false,
        cancelstatus : 0
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

    const handleCancel = async () => {
        try {
            const res = await cancelBooking({BookingID : booking.BookingID})
            console.log(res.data)
            if(res.data.success === true){
                setBooking({...booking, cancelstatus : 1})
                alert("Your request for cancellation of the booking has been sent to the agency. The refund will be issued within 1-2 business days 😊")
            }else{
                console.log("Error updating request")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div className="view-details-container margin-for-header relative">
                <div className={`z-20 fixed top-0 left-0 size-full flex justify-center items-center ${booking.cancelstatus !== 2 && "hidden"}`}>
                    <h1 className="text-3xl md:text-5xl font-bold text-red-600/50">Booking Cancelled</h1>
                </div>
                <div className={`z-20 fixed top-0 left-0 size-full flex justify-center items-center ${booking.cancelstatus !== 1 && "hidden"}`}>
                    <h1 className="text-3xl md:text-5xl font-bold text-red-600/50">Refund Pending</h1>
                </div>
                <div className="details-card z-10">
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
                        <button className={`cancel-btn ${(booking.isCancellable === false || booking.cancelstatus === 1 || booking.cancelstatus === 2) && "hidden"}`} onClick={handleCancel}>Cancel Booking</button>
                    </div>
                </div>
            </div>
        </>
    );
};
