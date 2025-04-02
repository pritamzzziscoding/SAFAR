import { useState } from "react";
import "../styles/booking-form.css"; // Importing external CSS
import { MdDelete } from "react-icons/md";
import { payment } from "../services/payment-api";

export const BookingForm = ({ packageId , price ,hide}) => {
    const [data, setData] = useState({
        packageId,
        start_date: "",
        members: [],
        amount: 0
    });

    const today = new Date().toISOString().split("T")[0];

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const length = data.members.length 
        setData({...data, amount : length * price})
        try {
            console.log(data)
            console.log(data.members.length)
            const res = await payment(data)
            if(res.data.success === true){
                console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={`booking-container ${hide}`}>
            <h2 className="form-title">Bookings For...</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
                <label htmlFor="start_date" className="form-label">Start Date</label>
                <input
                    className="form-input"
                    type="date"
                    name="start_date"
                    id="start_date"
                    required
                    min={today}
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