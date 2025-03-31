import { useState } from "react";

export const BookingForm = ({ touristId, packageId }) => {
    const [data, setData] = useState({
        touristId,
        packageId,
        start_date: "",
        members: [],
        status: "pending"
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
            members: [...data.members, { name: "", age: "", gender: "Male" }]
        });
    };

    const removeMember = (index) => {
        const updatedMembers = data.members.filter((_, i) => i !== index);
        setData({ ...data, members: updatedMembers });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
    };

    return (
        <form className="flex flex-col gap-3 p-4 bg-gray-100 rounded-md" onSubmit={handleSubmit}>
            <label htmlFor="start_date">Start Date</label>
            <input
                className="p-2 border rounded"
                type="date"
                name="start_date"
                id="start_date"
                required
                min={today} // ✅ Restrict past dates
                value={data.start_date}
                onChange={handleChange}
            />

            {/* Dynamic Members */}
            <label>Members</label>
            {data.members.map((member, index) => (
                <div key={index} className="flex flex-wrap items-center gap-2 p-2 border rounded">
                    <input
                        className="p-2 border rounded w-full sm:w-1/3"
                        type="text"
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                    />
                    <input
                        className="p-2 border rounded w-full sm:w-1/3"
                        type="number"
                        placeholder="Age"
                        value={member.age}
                        onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                    />
                    <select
                        className="p-2 border rounded w-full sm:w-1/3"
                        value={member.gender}
                        onChange={(e) => handleMemberChange(index, "gender", e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={() => removeMember(index)}>✖</button>
                </div>
            ))}

            <button type="button" className="bg-blue-500 text-white p-2 rounded" onClick={addMember}>Add Member</button>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit</button>
        </form>
    );
};