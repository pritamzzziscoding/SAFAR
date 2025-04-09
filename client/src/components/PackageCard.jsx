import '../styles/package-card.css'; // Separate CSS for margins and paddings
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { NavLink } from 'react-router-dom';

export const PackageCard = ({ pkg }) => { 
    return (
        <li className="package-card shadow-lg bg-teal-100 rounded-xl overflow-hidden transition-transform transform hover:scale-101">
            <img src={pkg.ImgURL || "https://img.freepik.com/premium-vector/cheerful-hand-drawn-cartoon-illustration-two-tourists-exploring-destination_1120563-3255.jpg"} alt="Package Thumbnail" className="thumbnail-image w-full h-48 object-cover" />
            <div className="card-content bg-white p-5 rounded-b-xl">
                <h2 className="package-name text-lg font-bold text-gray-800 truncate" >{pkg.Title}</h2>
                <p className="destination text-teal-600 font-medium">{pkg.Destination}</p>
                <p className="price text-green-600 font-semibold">₹{Math.round(pkg.Price)} per person</p>
                
                <div className="rating flex flex-col justify-start mt-4">
                    <div className="rating-info flex items-center gap-2">
                        <Rating
                            name="text-feedback"
                            value={pkg.TotalRating}
                            readOnly
                            precision={0.5}
                            size="large"
                            sx={{ color: "#FFD700" }} // Gold Stars
                            emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                        />
                        <span className="rating-text text-gray-700 text-sm">{Math.round(pkg.TotalRating * 10) / 10}</span>
                    </div>
                    <NavLink to={`/home/${pkg.PACKAGEID}`} className="explore-link text-teal-500 font-medium hover:underline">
                        Explore...
                    </NavLink>
                </div>
            </div>
        </li>
    );
};
