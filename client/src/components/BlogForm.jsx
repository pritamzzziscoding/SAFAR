import { useEffect, useState } from "react";
import { addBlog } from "../services/postData";
import { updateBlog } from "../services/update";

export const BlogForm = ({data, setData, edit, setEdit}) => {

    const handleChange = (e) => {
        const {name} = e.target
        setData({
            ...data, [name] : name === "image" ? e.target.files[0] : e.target.value
        })
    };

    useEffect(()=>{
        edit && setData({
            caption: edit.Titile,
            location: edit.Location,
            image: null,
            description: edit.Description
        })
    },[edit])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("caption", data.caption)
        formData.append("location", data.location)
        formData.append("image", data.image)
        formData.append("description", data.description)
        console.log(formData);

        try {
            if(edit){
                const res = await updateBlog(formData)
                if(res.data.success === true){
                    console.log("Data Saved Success Fully")
                    setData({
                        caption: "",
                        location: "",
                        image: null,
                        description: ""
                    })
                    setEdit(false)
                }else{
                    console.log("Data not Saved!!")
                }
            }else{
                const res = await addBlog(formData)
                console.log(res)
                if(res.data.success === true){
                    console.log("Data surakshit hai database mei")
                    setData({
                        caption: "",
                        location: "",
                        image: null,
                        description: ""
                    })
                }else{
                    console.log("Dekh agar sahi data bheja hai ki nehi")
                }
            }

        } catch (error) {
            console.log(error)
            console.log("Blog add karte samay backend mei keeda mila")
        }
    };

    return (
        <form className="blog-form bg-teal-400/20 rounded-xl text-teal-50" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 blog-content">
                <div className="flex justify-between items-center">
                    <label htmlFor="caption">Blog Caption: </label>
                    <input className="border-teal-50 w-[60%] border-2 rounded" type="text" name="caption" id="caption" required autoComplete="off" maxLength={30} placeholder="max length 30" value={data.caption} onChange={handleChange} />
                </div>
                <div className="flex justify-between items-center blog-content">
                    <label htmlFor="location">Location: </label>
                    <input className="border-teal-50 border-2 rounded w-[60%]" type="text" name="location" id="location" required autoComplete="off" maxLength={100} placeholder="max length 30" value={data.location} onChange={handleChange} />
                </div>
                <div className="flex justify-between items-center blog-content">
                    <label htmlFor="image">Image: </label>
                    <input className="border-teal-50 w-[60%] border-2 rounded" type="file" name="image" id="image" placeholder="Enter Image url" onChange={handleChange} />
                </div>
            </div>

            <div className="flex flex-col blog-content">
                <label htmlFor="description">Description: </label>
                <textarea className="bg-white/30 h-auto resize-none rounded text-sm border-2 border-teal-50" name="description" id="description" placeholder="For paragraph use <br />" rows={7} required value={data.description} onChange={handleChange}></textarea>
            </div>

            <button className="bg-green-600/70 rounded-md text-teal-50 blog-content" type="submit" value={edit ? "Edit" : "Add"}> {edit ? "Edit Blog" : "Add Blog"} </button>
        </form>
    );
};