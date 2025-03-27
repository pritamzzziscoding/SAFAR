import { useState } from "react";

export const AddPackage = ({ agency_id }) => {
    const [formData, setFormData] = useState({
        packagename: "",
        destination: "",
        price: 1000,
        duration: 1,
        address: "",
        image_url: "",
        description: "",
        agency_id: agency_id,
        is_active: true,
        facilities: []
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
        <form className="package-form gap-2 p-4 bg-teal-500/70 h-[100%] text-white rounded-2xl" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                        <label htmlFor="packagename" className="text-md font-medium">Package-Name: </label>
                        <input className="w-[40%] p-2 border rounded" type="text" name="packagename" id="packagename" required value={formData.packagename} onChange={handleChange} />
                    </div> 

                    <div className="flex justify-between">
                        <label htmlFor="destination" className="text-md font-medium">Destination: </label>
                        <input className="w-[40%] p-2 border rounded" type="text" name="destination" id="destination" required value={formData.destination} onChange={handleChange} />
                    </div>
                    
                    <div className="flex justify-between">
                        <label htmlFor="price" className="text-md font-medium">Price-Per Person: </label>
                        <input className="w-[40%] p-2 border rounded" type="number" name="price" id="price" required value={formData.price} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="duration" className="text-md font-medium">Duration-Days: </label>
                        <input className="w-[40%] p-2 border rounded" type="number" name="duration" id="duration" required value={formData.duration} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="address" className="text-md font-medium">Address: </label>
                        <input className="w-[40%] p-2 border rounded" type="text" name="address" id="address" required value={formData.address} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between">
                        <label htmlFor="image_url" className="text-md font-medium">Thumb-nail URL: </label>
                        <input className="w-[40%] p-2 border rounded" type="text" name="image_url" id="image_url" required value={formData.image_url} onChange={handleChange} />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="description" className="text-md font-medium">Add Description:</label>
                        <textarea className="w-[80%] outline-0 p-2 border rounded resize-none" name="description" id="description" required value={formData.description} onChange={handleChange}></textarea>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-xl font-medium">Add Providing Facilities</label>
                    {formData.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-2 w-[100%]">
                            <input
                                className="p-2 border-2 rounded w-[80%] border-teal-50/70 package-delete-btn"
                                type="text"
                                value={facility}
                                onChange={(e) => handleFacilityChange(index, e.target.value)}
                                placeholder="Enter facility"
                                required
                            />
                            <button type="button" className="package-delete-btn bg-red-500/70 text-white p-2 rounded" onClick={() => removeFacility(index)}>delete</button>
                        </div>
                    ))}

                    <button type="button" className="bg-teal-500 text-white rounded" onClick={addFacility}>Add Facility</button>
                </div>  
            </div>

            <button type="submit" className="package-btn bg-green-500/80 font-medium text-white p-2 rounded mt-2">Add Package</button>
        </form>
    );
};
