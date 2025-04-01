import '../styles/review-card.css'; // Separate file for margins & paddings
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const sampleReview = {
    touristName: "Sophia Williams",
    touristDp: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    feedback: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima sint recusandae magnam explicabo, animi eligendi voluptates magni delectus enim quos porro facilis nostrum velit nemo minus in modi. Eius error delectus recusandae fuga veritatis officiis, quo quas. Molestias repellendus perferendis saepe tempora maiores minima numquam excepturi molestiae vero, fugit harum placeat dolore officia, ducimus neque facere voluptate, consectetur ut amet quibusdam deleniti sunt quisquam cumque architecto. Distinctio neque tenetur vel quia. Eius rerum maiores asperiores. Aliquid laboriosam quia provident obcaecati corporis facilis quas quisquam recusandae qui. Qui tempora quo porro accusamus ratione culpa maiores, nihil laudantium cum doloremque, obcaecati at.",
    reviewDate: "March 28, 2024"
};

export const ReviewCard = ({ review = sampleReview }) => {
    return (
        <div className="review-card flex gap-4 p-5 rounded-lg shadow-md bg-white transition-transform transform hover:scale-101">
            
            {/* Tourist Profile Image */}
            <img src={review.touristDp} alt="Tourist DP" className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 shadow-sm" />
            
            {/* Review Content */}
            <div className="flex flex-col justify-between w-full">
                
                {/* Top Section - Name, Rating, Date */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{review.touristName}</h3>
                        <p className="text-gray-500 text-sm">{review.reviewDate}</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center">
                        <Rating
                            name="text-feedback"
                            value={review.rating}
                            readOnly
                            precision={0.5}
                            size="small"
                            sx={{ color: "#FFD700" }} // Golden Stars ⭐
                            emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                        />
                        <span className="text-gray-600 text-sm font-semibold ml-2">{review.rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Feedback Text */}
                <p className="mt-2 text-gray-800 text-sm leading-relaxed italic">“{review.feedback}”</p>
            </div>
        </div>
    );
};

