import '../styles/package-card.css'; // Import CSS file for styling
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { NavLink } from 'react-router-dom';

export const PackageCard = ({ pkg }) => { 
    return (
        <li className="package-card">
            <img src={pkg.ImgURL} alt="Package Thumbnail" className="thumbnail-image" />
            <div className="card-content">
                <h2 className="package-name">{pkg.Title}</h2>
                <p className="destination">{pkg.Destination}</p>
                <p className="price">₹{Math.round(pkg.Price)} per person</p>
                <div className="rating">
                    <div className="rating-info">
                        <Rating
                            name="text-feedback"
                            value={pkg.TotalRating}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <span className="rating-text">{Math.round(pkg.TotalRating * 100) / 100}</span>
                    </div>
                    <NavLink to={`/home/${pkg.PACKAGEID}`} className="explore-link">Explore...</NavLink>
                </div>
            </div>
        </li>
    );
};
