import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useParams } from "react-router-dom";
import { getPackageReviews } from "../services/get-data";
import { ReviewCard } from "../components/ReviewCard";

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { packageId } = useParams();
    console.log(packageId);
  
    const getReviews = async () => {
      try {
        const res = await getPackageReviews(packageId);
        if (res.data.success === true) {
          console.log(res.data);
          setReviews(res.data.reviews);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getReviews();
    }, [packageId]);
    return <>
        <Header />
        <div className="margin-for-header">
            <div className="container bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden border border-gray-200">
                <h1 className="text-center text-xl font-medium">Package Reviews</h1>
                {
                    reviews.map((review)=>{
                        return <ReviewCard review={review} />
                    })
                }
            </div>
        </div> 
    </>
}