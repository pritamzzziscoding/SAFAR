import React from "react";
import "../styles/PackageDetails.css";
import { useLoaderData } from "react-router-dom";

export const PackageDetails = () => {
  // Sample Data (Replace with API data)
  const p = useLoaderData()
  const packageData = p.data.packageData
//   const packageData = {
//     packageName: "Exotic Bali Tour",
//     image:
//       "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&q=80",
//     destination: "Bali, Indonesia",
//     address: "Sunset Road No. 101, Bali, Indonesia",
//     price: "$999 per head",
//     facilities: [
//       "5-Star Hotel Stay",
//       "Free Breakfast & Dinner",
//       "Sightseeing Tours",
//       "Airport Pickup & Drop",
//       "Adventure Activities",
//     ],
//     description:
//       "Experience the beauty of Bali with our exclusive package. Explore the stunning beaches, vibrant culture, and breathtaking landscapes with a well-curated itinerary.",
//     contact: "+62 812-3456-7890",
//   };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden border border-gray-200">
        {/* Image */}
        <img
          src={packageData.ImgURL}
          alt={packageData.Title}
          className="w-full h-72 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-teal-600">
            {packageData.Title}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{packageData.DESTINATION}</p>
          <p className="text-gray-500 mt-2">{packageData.ADDRESS}</p>

          {/* Price */}
          <div className="text-2xl font-semibold text-green-500 mt-4">
            ₹{packageData.Price}-{packageData.Duration} {packageData.Duration === 1 ? "Day" : "Days"}
          </div>

          {/* Facilities */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-teal-600">
              Facilities Included:
            </h2>
            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
              {packageData.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <p className="text-gray-700 mt-4">{packageData.Description}</p>

          {/* Contact Info */}
          <div className="mt-4 text-lg">
            <span className="font-semibold text-teal-600">Contact:</span>{" "}
            {packageData.phoneno}
          </div>

          {/* Book Now Button */}
          <div className="mt-6 flex justify-center">
            <button className="book-now-button shadow-2xl">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
