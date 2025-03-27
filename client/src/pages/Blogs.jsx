import { Header } from "../components/Header"
import "../styles/blogs.css"

export const Blogs = () => {
    return <>
        <Header />
        <div className="blog-container">
        </div>
        <div className="blog-main z-20 rounded-xl">
            <p className="h-20 blog-heading z-10 text-center bg-gradient-to-r from-green-700 to-teal-300 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Nomad Notes~Inspiring Travel Diaries</p>
        </div>
    </>
}