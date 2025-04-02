import { useState } from "react";
import "../styles/booking-form.css"; // Importing external CSS
import { MdDelete } from "react-icons/md";
import { payment } from "../services/payment-api";
import axios from "axios";
import { details } from "../services/auth-apis";

export const BookingForm = ({ packageId , price ,hide}) => {
    const [data, setData] = useState({
        packageId,
        start_date: "",
        members: [],
        amount: 0
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...data.members];
        updatedMembers[index][field] = value;
        setData({ ...data, members: updatedMembers });
    };

    const addMember = () => {
        setData({
            ...data,
            members: [...data.members, { name: "", age: "", gender: "Male" }],
        });
    };

    const removeMember = (index) => {
        const updatedMembers = data.members.filter((_, i) => i !== index);
        setData({ ...data, members: updatedMembers });
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        const length = data.members.length
        if(length === 0){
            alert("For Bookings there must be atleast 1 Traveller")
            return
        }
        setData({...data, amount : length * price})
        try {
            const {data:{key}} = await axios.get("http://localhost:8080/getKey")
            const { data:{result} } = await details()

            const res = await payment(data)

            if(res.data.success === true){
                
                const options = {
                    key: key, 
                    amount: res.data.order.amount,
                    currency: "INR",
                    name: "SAFAR PVT LIMITED", 
                    description: "Package Booking Transaction",
                    image: result.image_url,
                    order_id: res.data.order.id,
                    callback_url: "http://localhost:8080/paymentVerification",
                    prefill: { 
                        name: `${result.firstname} ${result.lastname}`,
                        email: result.email,
                        contact : result.phone
                    },
                    notes: {
                        address: "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "#3399cc"
                    }
                }; 

                const razor = new window.Razorpay(options)
                razor.open()

            }
        } catch (error) {
            console.log(error)
        }
    };

    const today = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 4);
    const maxDateString = maxDate.toISOString().split("T")[0];

    return (
        <div className={`booking-container ${hide}`}>
            <h2 className="form-title">Bookings For...</h2>
            <form className="booking-form" onSubmit={handlePayment}>
                <label htmlFor="start_date" className="form-label">Start Date</label>
                <input
                    className="form-input"
                    type="date"
                    name="start_date"
                    id="start_date"
                    required
                    min={today}
                    max={maxDateString}
                    value={data.start_date}
                    onChange={handleChange}
                />

                {/* Dynamic Members */}
                <label className="form-label">Add Travelers</label>
                {data.members.map((member, index) => (
                    <div key={index} className="member-card">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                        />
                        <input
                            className="form-input"
                            type="number"
                            placeholder="Age"
                            value={member.age}
                            min={0}
                            onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                        />
                        <select
                            className="form-select"
                            value={member.gender}
                            onChange={(e) => handleMemberChange(index, "gender", e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <button type="button" onClick={() => removeMember(index)}><MdDelete className="text-red-600 text-2xl"/></button>
                    </div>
                ))}
                <button type="button" className="add-member" onClick={addMember}>+ Add Traveler</button>
                <button type="submit" className="submit-btn">{"Pay Now >"}</button>
            </form>
        </div>
    );
};