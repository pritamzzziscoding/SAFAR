import { useEffect, useState } from "react"
import { BlogForm } from "../components/BlogForm"
import { Header } from "../components/Header"
import "../styles/blogs.css"
import { BlogCard } from "../components/BlogCard"
import { getBlog } from "../services/get-data"
import { details } from "../services/auth-apis"


function check(string1, string2) {
    if (string1.length > string2.length) return false;
    return string2.startsWith(string1);
}

export const Blogs = () => {
    const[search, setSearch] = useState("")
    const[userBlog, setUserBlog] = useState(false)
    const[blogs, setBlogs] = useState([])
    const[detail, setDetail] = useState({})
    const [like, setLike] = useState(null)
    const[edit, setEdit] = useState(false)
    const [data, setData] = useState({
        caption: "",
        location: "",
        image: null,
        description: ""
    });

    const getAndFilterBlogs = async () =>{
        try {
            const res = await getBlog()
            if(res.data.success === true){
                console.log("blogs fetched")
                const b = res.data.blogs
                const filterBlog = b.filter((blog)=>{
                    if(check(search, blog.Location)){
                        return true
                    }
                    return false
                })
                if(userBlog){
                    const newFilterArray = filterBlog.filter((blog)=>{
                        if(detail.id === blog.UserID) return true
                        return false
                    })
                    setBlogs(newFilterArray)
                }else{
                    setBlogs(filterBlog)
                }
            }
        } catch (error) {
            console.log("Backend mei keeda")
        }
    }

    const getDetails = async () => {
        try {
            const res = await details()
            if(res.data.success === true){
                setDetail(res.data.result)
            }
        } catch (error) {
            console.log("Backend Error hai!!!")
        }
    }

    useEffect(()=>{
        getDetails()
        getAndFilterBlogs()
    },[search, userBlog, like])

    return <>
        <Header />
        <div className="blog-container">
        </div>
        <div className="blog-main z-20 rounded-xl">
            <p className="h-20 blog-heading z-10 text-center bg-gradient-to-r from-green-50 to-teal-50 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold italic">Nomad Notes Inspiring Travel Diaries</p>
            <BlogForm data={data} setData={setData} edit={edit} setEdit={setEdit}/>
            <div className="bg-teal-50/80 grid sm:grid-cols-2 gap-5 blog-filter rounded-2xl">
                <input className="place-self-center blog-content h-8 w-[100%] rounded-xl" type="text" name="search" id="search" placeholder="Search Location" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <div className="flex items-center gap-10 place-self-center">
                    <p className="text-stone-900 font-medium">My Blogs: </p>
                    <input className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" type="checkbox" value={userBlog} onChange={()=>setUserBlog(prev => !prev)}/>
                </div>
            </div>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    blogs.map((blog) => {
                        return <BlogCard key={blog.BlogID} blog={blog} hide = {blog.UserID === detail.id && blog.UserType === detail.type ? "not-hidden" : "hidden"} like={like} setLike={setLike} setEdit={setEdit} setData={setData}/>
                    })
                }
            </ul>
        </div>
    </>
}

