import { useEffect, useState } from "react"
import { AddPackage } from "../components/AddPackage"
import { AgencyPackageCard } from "../components/AgencyPackageCard"
import { Header } from "../components/Header"
import "../styles/packages.css"
import { getAgencyPackage } from "../services/get-data"

export const Packages = () => {
    const[packages, setPackages] = useState([])
    const[edit, setEdit] = useState(null)
    const[refresh, setRefresh] = useState(false)
    
    const getPackage = async () => {
        try {
            const p = await getAgencyPackage()
            console.log(p.data.package)
            setPackages(p.data.package)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getPackage()
    },[refresh])

    return <>
        <Header />
        <div className="package-header">
            <p className="h-20 bg-gradient-to-r from-white to-white bg-clip-text text-transparent text-center text-2xl sm:text-3xl md:text-4xl font-bold italic shadow-4xl">Craft your Perfect Travel Package</p>
            <AddPackage setRefresh={setRefresh} edit={edit} setEdit={edit}/>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[95%] box">
            {
                packages.map((pkg)=>{
                    return <AgencyPackageCard key={pkg.PackageID} pkg={pkg} setRefresh={setRefresh} setEdit={setEdit}/>
                })
            }
        </ul>
    </>
}