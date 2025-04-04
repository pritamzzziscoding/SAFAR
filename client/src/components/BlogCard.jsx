import { useEffect, useState } from "react";
import { MdCloseFullscreen, MdDelete, MdEdit, MdLocationPin } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/BlogCard.css"; // Import margins & paddings only
import { checkLike, Like } from "../services/get-data";
import { deleteBlog } from "../services/delete-data";

export const BlogCard = ({
  blog,
  hide,
  setEdit,
  setRefresh,
}) => {

  const [full, setFull] = useState(false);
  const [currLike, setCurrentLike] = useState(false);
  const { BlogID, Description, ImgURL, Likes, Location, Title } = blog;

  const likeStatus = async () => {
    try {
      const res = await checkLike(BlogID)
      setCurrentLike(res.data.like)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    likeStatus()
  },[])

  const handleClick = () => {
    setFull((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteBlog(BlogID)
      if(res.data.success === true){
        alert("Blog deleted")
      }else{
        alert("Error deleting data")
      }
    } catch (error) {
      console.log(error)
    }
    setRefresh((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      await Like({BlogID})
    } catch (error) {
      console.log(error)
    }
    setCurrentLike(!currLike);
    setRefresh((prev)=>!prev)
  };

  const handleEdit = () => {
    setEdit(blog)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  return (
    <li className="blog-card bg-teal-100 rounded-lg shadow-lg overflow-hidden transition-transform transform">
      <img className="w-full h-56 object-cover" src={ImgURL} alt="Blog Thumbnail" />
      <div className="blog-content flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <button onClick={handleLike} className="flex items-center gap-1 text-gray-600">
            {currLike ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
            <span className="text-sm">{Likes} Likes</span>
          </button>
          <p className="flex items-center text-teal-600 text-sm font-medium">
            <MdLocationPin /> {Location}
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 truncate">{Title}</h2>
        <div className="flex justify-between">
          <button onClick={handleClick} className="text-teal-500 font-medium hover:underline">
            Read Blog
          </button>
          <div className={`${hide} flex gap-2 text-lg`}>
            <button onClick={handleDelete}>
              <MdDelete className="text-red-600 hover:text-red-700" />
            </button>
            <button onClick={handleEdit}>
              <MdEdit className="text-gray-700 hover:text-gray-900" />
            </button>
          </div>
        </div>
      </div>
      <BlogContent Title={Title} Description={Description} handleClick={handleClick} full={full} />
    </li>
  );
};

const BlogContent = ({ handleClick, full, Title, Description }) => {
  return (
    <div className={`${full ? "flex" : "hidden"} fixed inset-0 bg-teal-100/90 z-50 items-center justify-center`}>
      <div className="relative bg-white content-box rounded-lg shadow-lg h-[95%] w-[90%] max-w-2xl overflow-auto">
        <button onClick={handleClick} className="fixed top-7 right-7 text-2xl text-gray-700 hover:text-gray-900">
          <MdCloseFullscreen />
        </button>
        <h1 className="text-2xl font-bold text-teal-700 text-center">{Title}</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">{Description}</p>
      </div>
    </div>
  );
};