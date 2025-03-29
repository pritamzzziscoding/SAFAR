import { useState } from "react";
import { MdEdit, MdLocationPin } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { deleteBlog } from "../services/delete-data";

export const BlogCard = ({blog, deleteButton}) => {
    const [full, setFull] = useState(false)

    const {BlogID, Description, ImgURL,Likes,Location, Title, UserID, UserType} = blog

    const handleClick = () =>{
        console.log(full)
        setFull((prev) => !prev)
    }

    const handleDelete = async () => {
        try {
            const res = await deleteBlog({BlogID})
            if(res.data.success === true){
                alert(res.data.message)
            }else{
                alert("data delete nehi hua!!!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <li>
        <div className="bg-stone-200 blog-card rounded place-self-center">
            <img className="w-[100%] rounded-t" src="https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Add a Valid Image" />
            <div className="blog-card-content">
                <p className="text-xl text-stone-800 font-medium">{Title}</p>
                <p className="text-stone-600 flex items-center gap-2"><MdLocationPin /> {Location}</p>
                <div className="flex items-center justify-between">
                    <button onClick={handleClick} className="rounded text-green-500">Read more</button>
                    <button className="flex items-center justify-center gap-2"><FaRegHeart />{Likes}</button>
                    <button onClick={handleDelete} className={`${deleteButton}bg-red-500 w-10 h-8 flex justify-center items-center text-xl rounded text-white`}>Delete</button>
                    <button className="bg-red-500 w-10 h-8 flex justify-center items-center text-xl rounded text-white"><MdEdit /></button>
                </div>
            </div>
            <BlogContent Title={Title} Description={Description} handleClick={handleClick} full={full}/>
        </div>
    </li>
}


const BlogContent = ({handleClick, full, Title, Description}) => {
    return <div className={`${full === false ? "hidden" : ""} z-20 blog-content-desc fixed top-0 left-0 bg-teal-100/90 h-[100vh] w-full`}>
        <div className="fixed top-5 right-5">
            <button onClick={handleClick} className="text-3xl md:text-5xl text-stone-700"><MdClose /></button>
        </div>
        <div className="w-[90%] blog-desc h-[90%] bg-teal-700/80 overflow-auto rounded-lg custom-scrollbar">
            <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold italic text-stone-50">{Title}</h1>
            <p className="blog-para text-center text-sm sm:text-md md:text-lg italic text-stone-100">{Description}</p>
        </div>
    </div>
}