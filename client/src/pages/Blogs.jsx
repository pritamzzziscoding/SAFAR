import { useEffect, useState } from "react";
import { BlogForm } from "../components/BlogForm";
import { Header } from "../components/Header";
import { BlogCard } from "../components/BlogCard";
import { getBlog } from "../services/get-data";
import { details } from "../services/auth-apis";
import "../styles/blogs.css";

// Function to check if a string starts with another
const isMatchingSearch = (searchQuery, location) => {
    return location.toLowerCase().startsWith(searchQuery.toLowerCase());
};

export const Blogs = () => {
    const [search, setSearch] = useState("");
    const [userBlog, setUserBlog] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [edit, setEdit] = useState(false);
    const [refresh, setRefresh] = useState(false);
    
    const [blogData, setBlogData] = useState({
        caption: "",
        location: "",
        image: null,
        description: ""
    });

    // Fetch blogs from backend and apply filters
    const fetchBlogs = async () => {
        try {
            const res = await getBlog();
            if (res.data.success) {
                console.log("✅ Blogs fetched successfully");
                let filteredBlogs = res.data.blogs.filter(blog => isMatchingSearch(search, blog.Location));

                if (userBlog) {
                    filteredBlogs = filteredBlogs.filter(blog => blog.UserID === userDetails.id);
                }

                setBlogs(filteredBlogs);
            }
        } catch (error) {
            console.error("❌ Error fetching blogs from backend");
        }
    };

    // Fetch user details
    const fetchUserDetails = async () => {
        try {
            const res = await details();
            if (res.data.success) {
                setUserDetails(res.data.result);
            }
        } catch (error) {
            console.error("❌ Error fetching user details");
        }
    };

    useEffect(() => {
        fetchUserDetails();
        fetchBlogs();
    }, [search, userBlog, edit, refresh]);

    return (
        <>
            <Header />
            <div className="blog-container">
                <div className="blog-main">
                    <h1 className="blog-heading">Share Your Experience with the World!</h1>

                    {/* Blog Form */}
                    <BlogForm 
                        data={blogData} 
                        setData={setBlogData} 
                        edit={edit} 
                        setEdit={setEdit} 
                        setRefresh={setRefresh} 
                    />

                    {/* Search & Filter Section */}
                    <div className="blog-filter gap-6">
                        <input 
                            type="text" 
                            className="search-input w-[30%]"
                            placeholder="Search by Location..." 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                        <label className="filter-option">
                            <input 
                                type="checkbox" 
                                checked={userBlog} 
                                onChange={() => setUserBlog(prev => !prev)} 
                            />
                            Show My Blogs
                        </label>
                    </div>
                    <h1 className="text-center">Blog Section</h1>
                    {/* Blog Cards Section */}
                    <ul className="blog-list">
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <BlogCard 
                                    key={blog.BlogID} 
                                    blog={blog} 
                                    setRefresh={setRefresh} 
                                    hide={blog.UserID === userDetails.id && blog.UserType === userDetails.type ? "not-hidden" : "hidden"} 
                                    setEdit={setEdit} 
                                    setData={setBlogData} 
                                />
                            ))
                        ) : (
                            <p className="text-center no-blogs-message">No blogs found. Try searching for another location.</p>
                        )}
                    </ul>
                </div> 
            </div>
        </>
    );
};
