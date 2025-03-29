import { useEffect, useState } from "react"
import { BlogForm } from "../components/BlogForm"
import { Header } from "../components/Header"
import "../styles/blogs.css"
import { BlogCard } from "../components/BlogCard"
import { getBlog } from "../services/get-data"

export const Blogs = () => {
    const[search, setSearch] = useState("")
    const[userBlog, setUserBlog] = useState(false)
    const[blogs, setBlogs] = useState([])

    const getAndFilterBlogs = async () =>{
        try {
            const res = await getBlog()
            if(res.data.success === true){
                console.log("blogs fetched")
                console.log(res.data.blogs)
                setBlogs(res.data.blogs)
            }
        } catch (error) {
            console.log("Backend mei keeda")
        }
    }

    useEffect(()=>{
        getAndFilterBlogs()
    },[])

    return <>
        <Header />
        <div className="blog-container">
        </div>
        <div className="blog-main z-20 rounded-xl">
            <p className="h-20 blog-heading z-10 text-center bg-gradient-to-r from-green-50 to-teal-50 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold italic">Nomad Notes Inspiring Travel Diaries</p>
            <BlogForm />
            <div className="bg-teal-50/80 grid sm:grid-cols-2 gap-5 blog-filter rounded-2xl">
                <input className="place-self-center blog-content h-8 w-[100%] rounded-xl" type="text" name="search" id="search" placeholder="Search Location" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <div className="flex items-center gap-10 place-self-center">
                    <p className="text-stone-900 font-medium">My Blogs: </p>
                    <input className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" type="checkbox" value={userBlog} onChange={(e)=>setUserBlog(e.target.value)}/>
                </div>
            </div>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </ul>
        </div>
    </>
}

