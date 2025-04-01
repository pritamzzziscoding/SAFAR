import { BookingCard } from "../components/BookingCard";
import { Header } from "../components/Header"

export const Bookings = () => {
    return (
        <>
            <Header />
            <div className="mt-20">
                <BookingCard />
                <BookingCard />
                <BookingCard />
            </div>
        </>
    );
}