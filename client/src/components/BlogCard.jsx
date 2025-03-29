import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdLocationPin } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { deleteBlog } from "../services/delete-data";
import { checkLike, Like } from "../services/get-data";

export const BlogCard = ({ blog, deleteButton, like, setLike }) => {
  const [full, setFull] = useState(false);
  const [currLike, setCurrentLike] = useState();

  const {
    BlogID,
    Description,
    ImgURL,
    Likes,
    Location,
    Title,
    UserID,
    UserType,
  } = blog;

  const handleClick = () => {
    console.log(full);
    setFull((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteBlog({ BlogID: BlogID });
      if (res.data.success === true) {
        console.log("deleted");
      } else {
        console.log("not deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await Like({ BlogID });
      if (res.data.success === true) {
        setLike(res.data.like);
        setCurrentLike(res.data.like);
      }
    } catch (error) {
      console.log("Like wala keeda mila backend mei");
    }
  };

  const checkCurrentLiked = async () => {
    try {
      const res = await checkLike(BlogID);
      if (res.data.success === true) {
        setCurrentLike(res.data.like);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCurrentLiked();
  }, []);

  return (
    <li className="flex items center bg-red-500/50">
      <div className="bg-stone-200 blog-card rounded place-self-center flex flex-col justify-between">
        <img
          className="w-[100%] rounded-t"
          src={ImgURL}
          alt="Add a Valid Image"
        />
        <div className="blog-card-content">
          <p className="text-xl text-stone-800 font-medium">{Title}</p>
          <p className="text-stone-600 flex items-center gap-2">
            <MdLocationPin /> {Location}
          </p>
          <div className="flex items-center justify-between">
            <button onClick={handleClick} className="rounded text-green-500">
              Read more
            </button>
            <button
              onClick={handleLike}
              className={`${
                currLike ? "bg-green-500" : "bg-red-600"
              } flex items-center justify-center gap-2`}
            >
              <FaRegHeart />
              {Likes}
            </button>
            <button
              onClick={handleDelete}
              className={`${deleteButton} bg-red-500 w-10 h-8 flex justify-center items-center text-xl rounded text-white`}
            >
              <MdDelete />
            </button>
            <button className="bg-red-500 w-10 h-8 flex justify-center items-center text-xl rounded text-white">
              <MdEdit />
            </button>
          </div>
        </div>
        <BlogContent
          Title={Title}
          Description={Description}
          handleClick={handleClick}
          full={full}
        />
      </div>
    </li>
  );
};

const BlogContent = ({ handleClick, full, Title, Description }) => {
  return (
    <div
      className={`${
        full === false ? "hidden" : ""
      } z-20 blog-content-desc fixed top-0 left-0 bg-teal-100/90 h-[100vh] w-full`}
    >
      <div className="fixed top-5 right-5">
        <button
          onClick={handleClick}
          className="text-3xl md:text-5xl text-stone-700"
        >
          <MdClose />
        </button>
      </div>
      <div className="w-[90%] blog-desc h-[90%] bg-teal-700/80 overflow-auto rounded-lg custom-scrollbar">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold italic text-stone-50">
          {Title}
        </h1>
        <p className="blog-para text-center text-sm sm:text-md md:text-lg italic text-stone-100">
          {Description}
        </p>
      </div>
    </div>
  );
};
