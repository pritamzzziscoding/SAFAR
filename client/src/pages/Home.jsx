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
        <div className="header-home">
            <p className="bg-gradient-to-r from-teal-300 via-teal-50 to-teal-300 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold italic">Discover your perfect destination</p>
            <FilterForm filters={filters} setFilters={setFilters} handleSubmit={handleSubmit}/>
        </div>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] gap-5 package-display">
            {packages.map((pkg)=>{
                return <PackageCard pkg={pkg}/>
            })}
        </ul>
    </>
}