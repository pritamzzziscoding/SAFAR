import { useState } from "react";
import { MdCloseFullscreen, MdDelete, MdEdit, MdLocationPin } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/BlogCard.css"; // Import margins & paddings only

export const BlogCard = ({
  blog,
  hide,
  setLike,
  setEdit,
  setRefresh,
}) => {
  const [full, setFull] = useState(false);
  const [currLike, setCurrentLike] = useState(blog.LikedByUser);

  const { BlogID, Description, ImgURL, Likes, Location, Title } = blog;

  const handleClick = () => {
    setFull((prev) => !prev);
  };

  const handleDelete = () => {
    console.log("Blog Deleted:", BlogID);
    setRefresh((prev) => !prev);
  };

  const handleLike = () => {
    setCurrentLike(!currLike);
  };

  return (
    <li className="blog-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-101">
      <img className="w-full h-56 object-cover" src={ImgURL} alt="Blog Thumbnail" />
      <div className="blog-content flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <button onClick={handleLike} className="flex items-center gap-1 text-gray-600">
            {currLike ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
            <span className="text-sm">{currLike ? Likes + 1 : Likes} Likes</span>
          </button>
          <p className="flex items-center text-teal-600 text-sm font-medium">
            <MdLocationPin /> {Location}
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{Title}</h2>
        <button onClick={handleClick} className="text-teal-500 font-medium hover:underline">
          Read More...
        </button>
        <div className={`${hide} flex gap-2 text-lg`}>
          <button onClick={handleDelete}>
            <MdDelete className="text-red-600 hover:text-red-700" />
          </button>
          <button onClick={() => setEdit(blog)}>
            <MdEdit className="text-gray-700 hover:text-gray-900" />
          </button>
        </div>
      </div>
      <BlogContent Title={Title} Description={Description} handleClick={handleClick} full={full} />
    </li>
  );
};

const BlogContent = ({ handleClick, full, Title, Description }) => {
  return (
    <div className={`${full ? "flex" : "hidden"} fixed inset-0 bg-teal-100/90 z-50 items-center justify-center`}>
      <div className="relative bg-white content-box rounded-lg shadow-lg w-[90%] max-w-2xl overflow-auto">
        <button onClick={handleClick} className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900">
          <MdCloseFullscreen />
        </button>
        <h1 className="text-2xl font-bold text-teal-700 text-center">{Title}</h1>
        <p className="mt-4 text-gray-700 leading-relaxed">{Description}</p>
      </div>
    </div>
  );
};