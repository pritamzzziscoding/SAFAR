import { NavLink } from "react-router-dom";
import "../styles/BookingCard.css"; // External CSS for padding & margin

export const BookingCard = ({ booking = {
    PackageName: "Majestic Mountains Retreat",
    Destination: "Himalayas, India",
    PACKAGEID: "123"
} }) => {
    return (
        <div className="booking-card-container">
            <div className="booking-card">
                <div className="booking-info">
                    <h2 className="package-name">{booking.PackageName}</h2>
                    <p className="destination">{booking.Destination}</p>
                </div>
                <NavLink to={`/booking/${booking.PACKAGEID}`} className="view-details-btn">
                    View Details
                </NavLink>
            </div>
        </div>
    );
};

