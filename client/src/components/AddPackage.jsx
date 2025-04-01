import { useEffect, useState } from "react";
import { addPackage } from "../services/postData";
import { updatePackage } from "../services/update";
import "../styles/add-package.css"; // External CSS

export const AddPackage = ({ setRefresh, edit, setEdit, hide }) => {
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

    useEffect(() => {
        edit && setFormData({
            packagename: edit.Title,
            destination: edit.DESTINATION,
            price: edit.Price,
            duration: edit.Duration,
            address: edit.ADDRESS,
            image: null,
            description: edit.Description,
            facilities: edit.facilities
        });
    }, [edit]);

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
            if (edit) {
                fd.append("PackageID", edit.PackageID);
                const res = await updatePackage(fd);
                if (res.data.success) {
                    console.log("Data Edited");
                }
            } else {
                const res = await addPackage(fd);
                if (res.data.success) {
                    console.log("Data saved in backend");
                }
            }
        } catch (error) {
            console.log("Error saving/updating package in backend");
        }

        setFormData({
            packagename: "",
            destination: "",
            price: 1000,
            duration: 1,
            address: "",
            image: null,
            description: "",
            is_active: true,
            facilities: []
        });

        setEdit(null);
        setRefresh((prev) => !prev);
    };

    return (
        <form className={`${hide} package-form`} onSubmit={handleSubmit}>
            <h2 className="form-title">{edit ? "Edit Package" : "Add New Package"}</h2>
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                <div className="form-grid">
                <div className="form-group">
                    <label>Package Name</label>
                    <input type="text" name="packagename" required value={formData.packagename} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Destination</label>
                    <input type="text" name="destination" required value={formData.destination} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Price Per Person</label>
                    <input type="number" name="price" required value={formData.price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Duration (Days)</label>
                    <input type="number" name="duration" required value={formData.duration} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Thumbnail</label>
                    <input type="file" name="image" onChange={handleChange} />
                </div>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" required value={formData.description} onChange={handleChange}></textarea>
            </div>
                </div>
                <div>
                <div className="facilities-container flex flex-col items-start">
                <label>Providing Facilities</label>
                {formData.facilities.map((facility, index) => (
                    <div key={index} className="facility-item w-[100%]">
                        <input type="text" value={facility} onChange={(e) => handleFacilityChange(index, e.target.value)} placeholder="Enter facility" required />
                        <button type="button" className="remove-btn" onClick={() => removeFacility(index)}>✖</button>
                    </div>
                ))}
                <button type="button" className="add-btn" onClick={addFacility}>+ Add Facility</button>
            </div>
                </div>
            </div>
            
            <button type="submit" className="submit-btn">{edit ? "Update Package" : "Create Package"}</button>
        </form>
    );
};
