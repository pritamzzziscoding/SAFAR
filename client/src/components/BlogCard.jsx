import { MdLocationPin } from "react-icons/md";

export const BlogCard = () => {
    return <li>
        <div className="bg-stone-200 blog-card">
            <img className="w-[100%]" src="https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Add a Valid Image" />
            <div className="blog-card-content">
                <p className="text-xl text-stone-800 font-medium">Lorem ipsum dolor sit amet.</p>
                <p className="text-stone-600 flex items-center gap-2"><MdLocationPin /> Location</p>
                <button className="rounded text-green-500">Read more</button>
            </div>
        </div>
    </li>
}


const BlogContent = () => {
    
}