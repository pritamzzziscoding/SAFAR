import { NavLink } from "react-router-dom";
import "../styles/BookingCard.css"; // External CSS for padding & margin

export const BookingCard = ({id, title, destination,image_url}) => {
    return (
        <div className={`booking-card-container bg-[url('${image_url}') bg-cover bg-center] relative`}>
            <div className="booking-card absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent size-full">
                <div className="booking-info w-[60%] sm:w-[50%]">
                    <h2 className="package-name truncate">{title}</h2>
                    <p className="destination text-center sm:text-left">{destination}</p>
                </div>
                <div className="grid grid-cols-2 gap-0.5">
                    <NavLink to={`/rating/${id}`} className="view-details-btn">
                        Give Reviews
                    </NavLink>
                    <NavLink to={`/bookings/${id}`} className="view-details-btn">
                        View Details
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

