import { useState } from "react";
import "../styles/bookings-agency.css"; // Import margins & paddings CSS

export const CustomerBookings = () => {
    // Sample Booking Data
    const [bookings, setBookings] = useState([
        {
            BookingID: "BK-202503281234",
            TouristName: "Rohit Khanna",
            PackageName: "Luxury Maldives Escape",
            Members: [
                { name: "Rohit Khanna", age: 30, gender: "Male" },
                { name: "Aisha Verma", age: 27, gender: "Female" }
            ],
            BookingDate: "2025-03-28",
            StartDate: "2025-06-20",
            Duration: 5, // Trip Duration in Days
            TotalAmount: 120000
        },
        {
            BookingID: "BK-202503291456",
            TouristName: "Amit Sharma",
            PackageName: "Swiss Alps Adventure",
            Members: [
                { name: "Amit Sharma", age: 35, gender: "Male" }
            ],
            BookingDate: "2025-03-29",
            StartDate: "2025-07-15",
            Duration: 7, // Trip Duration in Days
            TotalAmount: 150000
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchID, setSearchID] = useState("");

    // Filter Logic
    const filteredBookings = bookings.filter((booking) =>
        booking.PackageName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        booking.BookingID.toLowerCase().includes(searchID.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            {/* Filter Section */}
            <div className="w-full max-w-lg flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Package Name"
                    className="w-full sm:w-1/2 border border-teal-600 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-teal-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by Booking ID"
                    className="w-full sm:w-1/2 border border-teal-600 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-teal-500"
                    value={searchID}
                    onChange={(e) => setSearchID(e.target.value)}
                />
            </div>

            {/* Booking Cards */}
            <div className="w-full max-w-md flex flex-col gap-6">
                {filteredBookings.map((booking) => (
                    <BookingCard key={booking.BookingID} booking={booking} />
                ))}
            </div>
        </div>
    );
};




const BookingCard = ({ booking }) => {
    return (
        <div className="relative bg-white bg-opacity-70 backdrop-blur-lg border border-teal-300 shadow-xl rounded-2xl overflow-hidden p-6 transition transform hover:scale-105 hover:shadow-2xl">
            <div className="absolute top-2 right-4 text-gray-400 text-xs">#{booking.BookingID}</div>
            
            <h2 className="text-2xl font-semibold text-teal-700">{booking.PackageName}</h2>
            <p className="text-gray-500">Tourist: <span className="text-gray-800 font-medium">{booking.TouristName}</span></p>

            <div className="flex justify-between text-gray-600 mt-4">
                <div>
                    <p className="text-sm">Booking Date:</p>
                    <p className="text-gray-900 font-semibold">{booking.BookingDate}</p>
                </div>
                <div>
                    <p className="text-sm">Start Date:</p>
                    <p className="text-gray-900 font-semibold">{booking.StartDate}</p>
                </div>
            </div>

            {/* Trip Duration Section */}
            <div className="mt-4 text-gray-800">
                <p className="text-sm">Trip Duration:</p>
                <p className="text-gray-900 font-semibold">{booking.Duration} days</p>
            </div>

            <p className="text-lg font-semibold text-green-600 mt-4">₹{booking.TotalAmount}</p>

            <h3 className="text-gray-800 font-semibold mt-3">Members:</h3>
            <ul className="mt-2 space-y-1">
                {booking.Members.map((member, index) => (
                    <li key={index} className="bg-green-100/60 p-2 rounded-md text-gray-700">
                        {member.name} ({member.age} yrs, {member.gender})
                    </li>
                ))}
            </ul>

            <button className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition">
                Refund to Tourist
            </button>
        </div>
    );
};