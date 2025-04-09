import { useEffect, useState } from "react";
import { BookingCard } from "../components/BookingCard";
import { Header } from "../components/Header"
import { getTouristBookings } from "../services/get-data";

export const Bookings = () => {
    const[bookings, setBookings] = useState([])
    
    const getBooking = async () => {
        try {
            const response = await getTouristBookings()
            setBookings(response.data.bookings)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getBooking()
    },[])

    console.log(bookings)

    return (
        <>
            <Header />
            <div className="mt-20">
                {
                    bookings.length == 0 ? (
                        "No Bookings Yet!!!"
                    ) : (
                        bookings.map((booking) => (
                            <BookingCard
                                key={booking.BookingID}
                                id={booking.BookingID}
                                title={booking.title}
                                destination={booking.destination}
                                isReviewable={booking.isReviewable}
                                image_url={booking.ImgURL}
                            />
                        ))
                    )
                }
            </div>
        </>
    );
}