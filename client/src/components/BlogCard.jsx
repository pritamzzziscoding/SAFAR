import { useEffect, useState } from "react";
import { MdCloseFullscreen, MdDelete, MdEdit, MdLocationPin } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { deleteBlog } from "../services/delete-data";
import { checkLike, Like } from "../services/get-data";
import { MdClose } from "react-icons/md";
import "../styles/BlogContent.css"

export const BlogCard = ({ blog, hide, setLike, setEdit, setData , setRefresh}) => {
  const [full, setFull] = useState(false);
  const [currLike, setCurrentLike] = useState(null);

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
      setRefresh((prev)=>!prev)
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await Like({BlogID});
      console.log("Manipulate ",res.data.like)
      if (res.data.success === true) {
        setLike(res.data.like);
        setCurrentLike(res.data.like)
      }
    } catch (error) {
      console.log("Like wala keeda mila backend mei");
    }
  };

  const checkCurrentLiked = async () => {
    try {
      const res = await checkLike(BlogID);
      console.log("Check Like ",res.data.like)
      if (res.data.success === true) {
        setCurrentLike(res.data.like);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (blog) => {
    setEdit(blog)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    checkCurrentLiked();
  }, []);

  return (
    <li className="flex items center rounded-lg ">
      <div className="bg-stone-200 blog-card rounded-lg place-self-center flex flex-col justify-between w-full h-full">
        <img
          className="package-image w-full h-55 object-cover rounded-t-lg"
          src={ImgURL}
          alt="Add a Valid Image"
        />
        <div className="blog-card-content">
          <div>
          <button style={{marginTop : "0px"}} onClick={handleLike} className="flex items-center gap-1.5">
              {currLike ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
              {Likes} Likes
            </button>
          </div>
          <p className="text-xl text-stone-800 font-medium">{Title}</p>
          <p className="text-stone-600 flex items-center gap-2">
            <MdLocationPin /> {Location}
          </p>
          <div className="flex items-center justify-between">
            <button onClick={handleClick} className="rounded text-green-500">
              Read more..
            </button>


            <div className={`${hide} text-2xl`}>
              <button onClick={handleDelete}>
                <MdDelete className="text-red-600"/>
              </button>
              <button onClick={()=>handleEdit(blog)}>
                <MdEdit />
              </button>
            </div>

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
        full ? "block" : "hidden"
      } z-20 blog-content-desc fixed top-0 left-0 bg-teal-100/90 h-full w-full flex items-center justify-center`}
    >
      <div className="fixed top-5 right-5 close-button">
        <button
          onClick={handleClick}
          className="text-3xl md:text-5xl text-stone-700"
        >
          <MdCloseFullscreen />
        </button>
      </div>
      <div className="w-[90%] h-[90%] bg-teal-700/80 overflow-auto rounded-lg custom-scrollbar description-container">
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
