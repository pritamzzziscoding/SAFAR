import "../styles/view-details.css"; // Import updated CSS
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ViewDetails = () => {
    const navigate = useNavigate();

    // Sample Booking Data
    const [booking] = useState({
        BookingID: "BK-202503281234",
        PackageName: "Luxury Maldives Escape",
        Destination: "Maldives",
        Duration: "5 Days / 4 Nights",
        TotalAmount: 120000,
        StartDate: "2025-06-20",
        BookingDate: "2025-03-28",
        Members: [
            { name: "Rohit Khanna", age: 30, gender: "Male" },
            { name: "Aisha Verma", age: 27, gender: "Female" },
        ],
    });

    return (
        <div className="view-details-container">
            <div className="details-card">
                <h1 className="package-title">{booking.PackageName}</h1>
                <p className="booking-id"><strong>Booking ID:</strong> {booking.BookingID}</p>
                <p className="destination"><strong>Location:</strong> {booking.Destination}</p>
                <p className="duration"><strong>Duration:</strong> {booking.Duration}</p>
                <p className="total-amount"><strong>Total Amount Paid:</strong> ₹{booking.TotalAmount}</p>
                <p className="start-date"><strong>Start Date:</strong> {booking.StartDate}</p>
                <p className="booking-date"><strong>Booking Date:</strong> {booking.BookingDate}</p>

                <h2 className="member-heading">Members Details</h2>
                <ul className="member-list">
                    {booking.Members.map((member, index) => (
                        <li key={index} className="member-item">
                            <span className="member-name">{member.name}</span> 
                            <span className="member-age">({member.age} yrs, {member.gender})</span>
                        </li>
                    ))}
                </ul>

                <div className="btn-group">
                    <button className="view-package-btn">View Package</button>
                    <button className="cancel-btn" onClick={() => navigate("/")}>Cancel Booking</button>
                </div>
            </div>
        </div>
    );
};
