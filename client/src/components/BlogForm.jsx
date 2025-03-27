import { useState } from "react";

export const BlogForm = () => {
    const [formData, setFormData] = useState({
        caption: "",
        location: "",
        image_url: "",
        description: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form className="blog-form bg-teal-400/60 rounded-xl text-teal-50" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 blog-content">
                <div className="flex justify-between items-center">
                    <label htmlFor="caption">Blog Caption: </label>
                    <input className="border-teal-50 w-[60%] border-2 rounded" type="text" name="caption" id="caption" required autoComplete="off" maxLength={30} placeholder="max length 30" value={formData.caption} onChange={handleChange} />
                </div>
                <div className="flex justify-between items-center blog-content">
                    <label htmlFor="location">Location: </label>
                    <input className="border-teal-50 border-2 rounded w-[60%]" type="text" name="location" id="location" required autoComplete="off" maxLength={100} placeholder="max length 30" value={formData.location} onChange={handleChange} />
                </div>
                <div className="flex justify-between items-center blog-content">
                    <label htmlFor="image_url">Image URL</label>
                    <input className="border-teal-50 w-[60%] border-2 rounded" type="url" name="image_url" id="image_url" required placeholder="Enter Image url" value={formData.image_url} onChange={handleChange} />
                </div>
            </div>

            <div className="flex flex-col blog-content">
                <label htmlFor="description">Description: </label>
                <textarea className="bg-white/30 h-auto resize-none rounded text-sm border-2 border-teal-50" name="description" id="description" placeholder="For paragraph use <br />" rows={7} required value={formData.description} onChange={handleChange}></textarea>
            </div>

            <button className="bg-green-600/70 rounded-md text-teal-50 blog-content" type="submit">Add Blog</button>
        </form>
    );
};