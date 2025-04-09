import { useEffect, useState } from "react";
import { addBlog } from "../services/postData";
import { updateBlog } from "../services/update";
import "../styles/blogForm.css";

export const BlogForm = ({ data, setData, edit, setEdit, setRefresh }) => {
    const[isSubmitting, setIsSubmitting] = useState(false)
    const handleChange = (e) => {
        const { name } = e.target;
        setData({
            ...data,
            [name]: name === "image" ? e.target.files[0] : e.target.value
        });
    };

    useEffect(() => {
        if (edit) {
            setData({
                caption: edit.Title,
                location: edit.Location,
                image: null,
                description: edit.Description
            });
        }
    }, [edit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        const formData = new FormData();
        formData.append("caption", data.caption);
        formData.append("location", data.location);
        formData.append("image", data.image);
        formData.append("description", data.description);

        try {
            if (edit) {
                formData.append("blogId", edit.BlogID);
                const res = await updateBlog(formData);
                if (res.data.success) {
                    console.log("✅ Blog updated successfully");
                    setData({ caption: "", location: "", image: null, description: "" });
                    setEdit(false);
                } else {
                    console.log("❌ Blog update failed!");
                }
            } else {
                const res = await addBlog(formData);
                if (res.data.success) {
                    console.log("✅ Blog added successfully");
                    setData({ caption: "", location: "", image: null, description: "" });
                } else {
                    console.log("❌ Blog addition failed!");
                }
            }
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("❌ Backend error while adding blog:", error);
        }
        setIsSubmitting(false)
    };

    return (
        <form className="blog-form bg-teal-50" onSubmit={handleSubmit}>
            <h2 className="form-heading">{edit ? "Edit Your Blog" : "Add a New Blog"}</h2>

            <div className="form-grid grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="form-group">
                    <label htmlFor="caption">Caption</label>
                    <input 
                        type="text" 
                        name="caption" 
                        id="caption" 
                        required 
                        maxLength={60} 
                        placeholder="Enter a catchy title" 
                        value={data.caption} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        id="location" 
                        required 
                        maxLength={100} 
                        placeholder="Where is this experience?" 
                        value={data.location} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <input 
                        type="file" 
                        name="image" 
                        id="image" 
                        onChange={handleChange} 
                    />
                </div>
            </div>

            <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea 
                    name="description" 
                    id="description" 
                    placeholder="Describe your experience..." 
                    rows={7} 
                    required 
                    value={data.description} 
                    onChange={handleChange} 
                ></textarea>
            </div>

            <button className="submit-btn" type="submit">
                {isSubmitting ? "Submitting..." : (edit ? "Update Blog" : "Add Blog")}
            </button>

        </form>
    );
};
