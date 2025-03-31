import { useEffect, useState } from "react";
import { addPackage } from "../services/postData";
//import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow"
import "../styles/add-package.css"; // Import the CSS file for padding and margin
import { updatePackage } from "../services/update";

export const AddPackage = ({ agency_id, setRefresh, edit, setEdit}) => {
    const [formData, setFormData] = useState({
        packagename: "",
        destination: "",
        price: 1000,
        duration: 1,
        address: "",
        image: null,
        description: "",
        facilities: []
    });

    useEffect(()=>{
        console.log(edit)
        edit && setFormData({
            packagename: edit.Title,
            destination: edit.DESTINATION,
            price: edit.Price,
            duration: edit.Duration,
            address: edit.ADDRESS,
            image: null,
            description: edit.Description,
            facilities: edit.facilities
        })
    },[edit])

    const handleChange = (event) => {
        const { name } = event.target;
        setFormData({ ...formData, [name]: name === 'image' ? event.target.files[0] : event.target.value });
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fd = new FormData();
        fd.append("packagename", formData.packagename);
        fd.append("destination", formData.destination);
        fd.append("price", formData.price);
        fd.append("duration", formData.duration);
        fd.append("address", formData.address);
        fd.append("description", formData.description);
        fd.append("facilities", JSON.stringify(formData.facilities));
        fd.append("image", formData.image);
        
        try {
            if(edit){
                fd.append("PackageID", edit.PackageID)
                const res = await updatePackage(fd)
                if(res.data.success === true){
                    console.log("Data Edited")
                }
            }else{
                const res = await addPackage(fd);
                if (res.data.success === true) {
                    console.log("Data saved in backend");
                }
            }
        } catch (error) {
            console.log("Data update ya save kartw wqat backend mei keeda mila");
        }
        setFormData({
            packagename: "",
            destination: "",
            price: 1000,
            duration: 1,
            address: "",
            image: null,
            description: "",
            agency_id: agency_id,
            is_active: true,
            facilities: []
        });
        setEdit(null)
        setRefresh((prev)=>!prev)
    };

    return (
        <form className="package-form bg-teal-600/80 h-full text-white rounded-2xl shadow-lg" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between package-margin">
                        <label htmlFor="packagename" className="text-md font-medium">Package Name:</label>
                        <input max={20} className="w-[40%] package-padding border border-teal-200 rounded focus:outline-none focus:ring focus:ring-teal-300" type="text" name="packagename" id="packagename" required value={formData.packagename} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between package-margin">
                        <label htmlFor="destination" className="text-md font-medium">Destination:</label>
                        <input className="w-[40%] package-padding border border-teal-200 rounded focus:outline-none focus:ring focus:ring-teal-300" type="text" name="destination" id="destination" required value={formData.destination} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between package-margin">
                        <label htmlFor="price" className="text-md font-medium">Price Per Person:</label>
                        <input className="w-[40%] package-padding border border-teal-200 rounded focus:outline-none focus:ring focus:ring-teal-300" type="number" name="price" id="price" required value={formData.price} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between package-margin">
                        <label htmlFor="duration" className="text-md font-medium">Duration (Days):</label>
                        <input className="w-[40%] package-padding border border-teal-200 rounded focus:outline-none focus:ring focus:ring-teal-300" type="number" name="duration" id="duration" required value={formData.duration} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between package-margin">
                        <label htmlFor="address" className="text-md font-medium">Address:</label>
                        <input className="w-[40%] package-padding border border-teal-200 rounded focus:outline-none focus:ring focus:ring-teal-300" type="text" name="address" id="address" required value={formData.address} onChange={handleChange} />
                    </div>

                    <div className="flex justify-between package-margin">
                        <label htmlFor="image" className="text-md font-medium">Package Thumbnail:</label>
                        <input className="w-[40%] package-padding border border-teal-200 rounded focus:outline-none focus:ring focus:ring-teal-300" type="file" name="image" id="image" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col items-start gap-2 package-margin">
                        <label htmlFor="description" className="text-md font-medium">Add Description:</label>
                        <textarea className="w-[80%] outline-none package-padding border border-teal-200 rounded resize-none focus:outline-none focus:ring focus:ring-teal-300" name="description" id="description" required value={formData.description} onChange={handleChange}></textarea>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <label className="text-xl font-medium package-margin">Add Providing Facilities</label>
                    {formData.facilities.map((facility, index) => (
                        <div key={index} className={`flex items-center gap-2 w-full package-margin`}>
                            <input
                                className={`package-padding p-2 border border-teal-200 rounded w-[80%] focus:outline-none focus:ring focus:ring-teal-300`}
                                type={`text`}
                                value={facility}
                                onChange={(e) => handleFacilityChange(index, e.target.value)}
                                placeholder={`Enter facility`}
                                required
                            />
                            <button
                                type={`button`}
                                className={`bg-red-500/70 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200`}
                                onClick={() => removeFacility(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    <button
                        type={`button`}
                        className={`bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 mt-2 p-2`}
                        onClick={addFacility}
                    >
                        Add Facility
                    </button>
                </div>  
            </div>

            <button type={`submit`} className={`bg-green-600 text-white font-medium p-2 rounded mt-4 hover:bg-green-700 transition-colors duration-200`}>
                {edit ? "Edit Package" : "Add Packages"}
            </button>
        </form>
    );
};
