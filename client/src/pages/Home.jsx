import { useEffect, useState } from "react";
import { FilterForm } from "../components/FilterForm"
import { Header } from "../components/Header"
import "../styles/home.css"
import { PackageCard } from "../components/PackageCard";
import { getFilteredPackage } from "../services/postData";

export const Home = () => {
    const[packages, setPackages] = useState([])
    const[refresh, setRefresh] = useState(false)
    const [filters, setFilters] = useState({
        destination: "",
        rating: "",
        maximum: "",
        sort: false,
    });



    const getPackages = async () => {
        try {
            const res = await getFilteredPackage(filters)
            console.log(res.data.package)
            setPackages(res.data.package)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setRefresh(!refresh)
    };

    useEffect(()=>{
        getPackages()
    },[refresh])

    return <>
        <Header />
        <div className="relative">
            <video 
                className="absolute top-0 left-0 w-full object-cover -z-10 h-150"
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src="https://cdn.pixabay.com/video/2019/06/19/24541-343454486_large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        <div className="header-home">
        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
  <p className="bg-gradient-to-r from-teal-700 via-teal-400 to-teal-600 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold italic">
    Discover your perfect destination
  </p>
</div>

            <FilterForm filters={filters} setFilters={setFilters} handleSubmit={handleSubmit}/>
        </div>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] gap-5 package-display">
            {packages.map((pkg)=>{
                return <PackageCard pkg={pkg}/>
            })}
        </ul>
    </>
}