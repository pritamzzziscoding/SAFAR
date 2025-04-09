import { NavLink } from "react-router-dom";
import "../styles/BookingCard.css"; // External CSS for padding & margin

export const BookingCard = ({id, title, destination,image_url, isReviewable}) => {
    return (
        <div className={`booking-card-container bg-[url('${image_url}') bg-cover bg-center`}>
            <div className="booking-card bg-gradient-to-r from-teal-900 via-teal-500/50 to-teal-100/10 relative">
                <div className="-z-10 absolute top-0 left-0 size-full rounded-lg bg-center bg-cover" style={{ backgroundImage: `url(${image_url})` }}></div>
                <div className="booking-info w-[60%] sm:w-[50%]">
                    <h2 className="package-name truncate text-stone-100">{title}</h2>
                    <p className="destination text-center sm:text-left text-white!">{destination}</p>
                </div>
                <div className="grid grid-cols-2 gap-0.5">
                    <NavLink to={`/rating/${id}`} className={`${isReviewable===true || "hidden"} view-details-btn col-start-1`}>
                        Give Reviews
                    </NavLink>
                    <NavLink to={`/bookings/${id}`} className="view-details-btn col-start-2">
                        View Details
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

