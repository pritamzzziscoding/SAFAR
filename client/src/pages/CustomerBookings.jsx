import { useEffect, useState } from "react";
import "../styles/bookings-agency.css"; // Import margins & paddings CSS
import { useParams } from "react-router-dom";
import { getBookingsForAgency } from "../services/get-data";
import { Header } from "../components/Header";

export const CustomerBookings = () => {
    const {package_id} = useParams()
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchID, setSearchID] = useState("");

    // Filter Logic

    const getBooking = async () => {
        try {
            const res = await getBookingsForAgency(package_id)
            if(res.data.success === true){
                setBookings(res.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBooking()
    },[id])



    const filteredBookings = bookings.filter((booking) => {
        const fullname = (`${booking.firstname} ${booking.lastname}`).toLowerCase()
        return fullname.includes(searchTerm.toLowerCase()) &&
        booking.BookingID.toLowerCase().includes(searchID.toLowerCase())
    });

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
                {/* Filter Section */}
                <div className="w-full max-w-lg flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by Name"
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
        </>
    );
};




const BookingCard = ({ booking }) => {
    return (
        <div className="relative bg-white bg-opacity-70 border border-teal-300 shadow-xl rounded-2xl overflow-hidden p-6 transition transform hover:scale-101 hover:shadow-2xl">
            <div className="absolute top-2 right-4 text-gray-400 text-xs">#{booking.BookingID}</div>
            
            <p className="text-gray-500">Tourist: <span className="text-gray-800 font-medium">{booking.firstname} {booking.lastname}</span></p>

            <div className="flex justify-between text-gray-600 mt-4">
                <div>
                    <p className="text-sm">Booking Date:</p>
                    <p className="text-gray-900 font-semibold">{booking.BookingDate.split("T")[0]}</p>
                </div>
                <div>
                    <p className="text-sm">Start Date:</p>
                    <p className="text-gray-900 font-semibold">{booking.FromDate.split("T")[0]}</p>
                </div>
            </div>

            <p className="text-lg font-semibold text-green-600 mt-4">₹{booking.NetPayableAmount}</p>

            <h3 className="text-gray-800 font-semibold mt-3">Members:</h3>
            <ul className="mt-2 space-y-1">
                {booking.Members.map((member, index) => (
                    <li key={index} className="bg-green-100/60 p-2 rounded-md text-gray-700">
                        {member.MemberName} ({member.age} yrs, {member.gender})
                    </li>
                ))}
            </ul>

            {/* <button className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition">
                Refund to Tourist
            </button> */}
        </div>
    );
};