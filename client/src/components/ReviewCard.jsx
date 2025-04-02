import '../styles/review-card.css'; // Separate file for margins & paddings
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export const ReviewCard = ({ review }) => {
    return (
        <div className="review-card flex gap-4 p-5 rounded-lg shadow-md bg-white transition-transform transform hover:scale-101">
            
            {/* Tourist Profile Image */}
            <img src={review.imgURL} alt="Tourist DP" className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 shadow-sm" />
            
            {/* Review Content */}
            <div className="flex flex-col justify-between w-full">
                
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{review.firstname}</h3>
                        <p className="text-gray-500 text-sm">{review.ReviewDate.split("T")[0]}</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center">
                        <Rating
                            name="text-feedback"
                            value={review.Rating}
                            readOnly
                            precision={0.5}
                            size="small"
                            sx={{ color: "#FFD700" }}
                            emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                        />
                        <span className="text-gray-600 text-sm font-semibold ml-2">{review.Rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Feedback Text */}
                <p className="mt-2 text-gray-800 text-sm leading-relaxed italic">{review.Feedback}”</p>
            </div>
        </div>
    );
};

