import { useEffect, useState } from "react"
import { AddPackage } from "../components/AddPackage"
import { AgencyPackageCard } from "../components/AgencyPackageCard"
import { Header } from "../components/Header"
import "../styles/packages.css"
import { getAgencyPackage } from "../services/get-data"
import { MdLibraryAdd } from "react-icons/md"

export const Packages = () => {
    const[packages, setPackages] = useState([])
    const[edit, setEdit] = useState(null)
    const[refresh, setRefresh] = useState(false)
    const[hide, setHide] = useState(true)
    
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
            <p className="h-20 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 bg-clip-text text-transparent text-center text-2xl sm:text-3xl md:text-4xl font-bold shadow-4xl">Craft your Perfect Travel Package</p>
            <div className={`${hide === false ? "hidden":""} w-[80%] flex flex-col items-center text-2xl font-medium`}>
                <p className="text-center">Enhance your offerings effortlessly—click the button to add packages and expand your services.</p>
                <MdLibraryAdd onClick={()=>setHide(false)} className={`text-9xl just add-btn`} />
            </div>
            
            <AddPackage setRefresh={setRefresh} edit={edit} setEdit={setEdit} hide={hide === true ? "hidden":""}/>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                packages.map((pkg)=>{
                    return <AgencyPackageCard key={pkg.PackageID} pkg={pkg} setRefresh={setRefresh} setEdit={setEdit}/>
                })
            }
        </ul>
    </>
}