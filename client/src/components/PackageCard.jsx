import '../styles/package-card.css'; // Import the CSS file for margins and paddings
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { NavLink } from 'react-router-dom';

export const PackageCard = ({pkg}) => {
    console.log(pkg)
    return (
        <li className="package-card bg-gradient-to-r from-teal-700/80 to-green-600/80 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img
                src={pkg.ImgURL}
                alt="Package Thumbnail"
                className="thumbnail-image"
            />
            <div className="card-content">
                <h2 className="package-name truncate">{pkg.Title}</h2>
                <p className="destination">{pkg.Destination}</p>
                <p className="price">₹{Math.round(pkg.Price)} per person</p>
                <div className="rating flex items-center gap-1 justify-between">
                    <div className='flex items-center justify-center gap-1'>
                        <Rating
                            className='text-sm'
                            name="text-feedback"
                            value={pkg.TotalRating}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <span className="ml-2 text-gray-200 flex items-end">{Math.round(pkg.TotalRating * 100) / 100}</span>
                    </div>
                    <div className='cursor-pointer'>
                        <NavLink to={`/home/${pkg.PACKAGEID}`}>Explore...</NavLink>
                    </div>
                </div>
            </div>
        </li>
    );
};
