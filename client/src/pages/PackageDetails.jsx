import React, { useEffect, useState } from "react";
import "../styles/PackageDetails.css";
import { useLoaderData, useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { BookingForm } from "../components/BookingForm";
import { ReviewCard } from "../components/ReviewCard";
import { getPackageReviews } from "../services/get-data";
import {Header} from "../components/Header"

export const PackageDetails = () => {
  const [hide, setHide] = useState(true);
  const [reviews, setReviews] = useState([]);
  const p = useLoaderData();
  const packageData = p.data.packageData;

  const { packageID } = useParams();
  console.log(packageID);

  const getReviews = async () => {
    try {
      const res = await getPackageReviews(packageID);
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
  }, [packageID]);

  return (
    <>
        <Header />
        <div className="bg-green-50 text-gray-900 min-h-screen flex items-center flex-col justify-center p-6 margin-for-header">
            <div className="container bg-stone-50 rounded-lg shadow-lg max-w-4xl w-full overflow-hidden border border-gray-200">
                {/* Image */}
                <img
                src={packageData.ImgURL || "https://img.freepik.com/premium-vector/cheerful-hand-drawn-cartoon-illustration-two-tourists-exploring-destination_1120563-3255.jpg"}
                alt={packageData.Title}
                className="w-full h-72 object-cover"
                />

                {/* Content */}
                <div className="p-6">
                <h1 className="text-3xl font-bold text-teal-600">
                    {packageData.Title}
                </h1>
                <p className="text-lg text-gray-600 mt-2">📍{packageData.DESTINATION}</p>
                

                {/* Price & Duration Section */}
                <div className="price-duration-container sm:flex items-center">
                    <div className="price">
                    <span className="label">Price:</span> ₹{Math.round(packageData.Price)}/per person
                    </div>
                    <div className="duration">
                    <span className="label">Duration:</span> {packageData.Duration} {packageData.Duration === 1 ? "Day" : "Days"}
                    </div>
                </div>

                {/* Facilities */}
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-teal-600">
                    Facilities and Iteneries Included:
                    </h2>
                    <ul className="mt-2 list-inside space-y-1 text-gray-700">
                    {packageData.facilities.map((facility, index) => (
                        <li key={index} className="flex gap-0.5 items-center"><IoIosArrowForward className="text-teal-300"/> {facility}</li>
                    ))}
                    </ul>
                </div>

                {/* Description */}
                <p className="text-gray-700 mt-4">{packageData.Description}</p>

                {/* Contact Info */}
                <div className="mt-4 text-lg">
                    <p className="flex gap-2 items-center"><span className="font-semibold text-teal-600 flex items-center"><FaPhoneAlt /></span> {packageData.phoneno}</p>
                    <p className="flex gap-2 items-center"><span className="font-semibold text-teal-600"><FaLocationDot /></span>{packageData.ADDRESS}</p>
                </div>

                {/* Book Now Button */}
                <div className={`${hide === true ? "" : "hidden"} mt-6 flex justify-center`}>
                    <button onClick={()=>setHide(false)} className="book-now-button shadow-2xl">Book Now</button>
                </div>

                </div>
                <BookingForm packageId={packageData.PackageID} price={packageData.Price} hide={hide ? "hidden" : ""}/>
            </div>
            <div className="container bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden border border-gray-200">
                <h1>Package Reviews</h1>
                {
                    reviews.map((review)=>{
                        return <ReviewCard review={review} />
                    })
                }
            </div>
        </div>
    </>
  );
};

export default PackageDetails;
