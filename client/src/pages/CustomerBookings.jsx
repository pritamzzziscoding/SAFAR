import { useEffect, useState } from "react";
import "../styles/bookings-agency.css"; // Import margins & paddings CSS
import { useParams } from "react-router-dom";
import { getBookingsForAgency } from "../services/get-data";
import { Header } from "../components/Header";
import { giveRefund } from "../services/update";

function generateBookingId(date, id) {
    let dateObj = new Date(date);
    let formattedDate = dateObj.getFullYear().toString() +
                        String(dateObj.getMonth() + 1).padStart(2, '0') +
                        String(dateObj.getDate()).padStart(2, '0');
    let formattedId = String(id).padStart(4, '0');
    return `BK-${formattedDate}${formattedId}`;
}

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
                console.log(res.data.result)
                setBookings(res.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBooking()
    },[package_id])



    const filteredBookings = bookings.filter((booking) => {
        const fullname = (`${booking.firstname} ${booking.lastname}`).toLowerCase()
        const b_id = generateBookingId(booking.BookingDate.split("T")[0], booking.BookingID)
        console.log(b_id)
        return fullname.includes(searchTerm.toLowerCase()) &&
        b_id.toLowerCase().includes(searchID.toLowerCase())
    });

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 margin-for-header">
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
    
    const handleRefund = async () => {
        try {
            const res = await giveRefund({BookingID : booking.BookingID})
            console.log(res.data)
            if(res.data.success === true){
                console.log("Refund Processed!!!");
            }else{
                console.log("Error in refund giving!!!")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="relative bg-white bg-opacity-70 border border-teal-300 shadow-xl rounded-2xl overflow-hidden p-6 transition transform hover:scale-101 hover:shadow-2xl">
            <div className="absolute top-2 right-4 text-gray-400 text-xs">#{generateBookingId(booking.BookingDate.split("T")[0],booking.BookingID)}</div>
            
            <p className="text-gray-500">Tourist: <span className="text-gray-800 font-medium">{booking.firstname} {booking.lastname}</span></p>
            <p className="text-gray-500">Email: <span className="text-gray-800 font-medium">{booking.email}</span></p>

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
                {booking.members.map((member, index) => (
                    <li key={index} className="bg-green-100/60 flex justify-between p-2 rounded-md text-gray-700">
                        <span>{member.MemberName}</span> <span>({member.age} yrs, {member.gender})</span> 
                    </li>
                ))}
            </ul>

            <button onClick={handleRefund} className={`${booking.cancelstatus === 0 && "hidden"} mt-5 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition`}>
                Refund to Tourist
            </button>
        </div>
    );
};