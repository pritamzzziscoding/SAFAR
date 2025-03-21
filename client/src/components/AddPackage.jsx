import { useState } from "react";

export const AddPackage = ({ agency_id }) => {
    const [formData, setFormData] = useState({
        destination: "",
        price: 10000,
        duration: 1,
        address: "",
        image_url: "",
        description: "",
        agency_id: agency_id,
        is_active: true,
        facilities: [] // ✅ Store facilities as an array
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFacilityChange = (index, value) => {
        const updatedFacilities = [...formData.facilities];
        updatedFacilities[index] = value;
        setFormData({ ...formData, facilities: updatedFacilities });
    };

    const addFacility = () => {
        setFormData({ ...formData, facilities: [...formData.facilities, ""] });
    };

    const removeFacility = (index) => {
        const updatedFacilities = formData.facilities.filter((_, i) => i !== index);
        setFormData({ ...formData, facilities: updatedFacilities });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <form className="flex flex-col gap-2 p-4 bg-gray-100 rounded-md" onSubmit={handleSubmit}>

            <label htmlFor="destination">Destination</label>
            <input className="p-2 border rounded" type="text" name="destination" id="destination" required value={formData.destination} onChange={handleChange} />

            <label htmlFor="price">Price</label>
            <input className="p-2 border rounded" type="number" name="price" id="price" required value={formData.price} onChange={handleChange} />

            <label htmlFor="duration">Duration</label>
            <input className="p-2 border rounded" type="number" name="duration" id="duration" required value={formData.duration} onChange={handleChange} />

            <label htmlFor="address">Address</label>
            <input className="p-2 border rounded" type="text" name="address" id="address" required value={formData.address} onChange={handleChange} />

            <label htmlFor="image_url">Image URL</label>
            <input className="p-2 border rounded" type="text" name="image_url" id="image_url" required value={formData.image_url} onChange={handleChange} />

            <label htmlFor="description">Add Description</label>
            <textarea className="p-2 border rounded resize-none" name="description" id="description" required value={formData.description} onChange={handleChange}></textarea>

            <label>Facilities</label>
            {formData.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index+1}
                    <input
                        className="p-2 border rounded w-full"
                        type="text"
                        value={facility}
                        onChange={(e) => handleFacilityChange(index, e.target.value)}
                        placeholder="Enter facility"
                    />
                    <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={() => removeFacility(index)}>✖</button>
                </div>
            ))}

            <button type="button" className="bg-blue-500 text-white p-2 rounded mt-2" onClick={addFacility}>Add Facility</button>

            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2">Submit</button>
        </form>
    );
};
