import { AddPackage } from "../components/AddPackage"
import { AgencyPackageCard } from "../components/AgencyPackageCard"
import { Header } from "../components/Header"
import { PackageCard } from "../components/PackageCard"
import "../styles/packages.css"

export const Packages = () => {
    return <>
        <Header />
        <div className="package-header">
            <p className="h-20 bg-gradient-to-r from-white to-white bg-clip-text text-transparent text-center text-2xl sm:text-3xl md:text-4xl font-bold italic shadow-4xl">Craft your Perfect Travel Package</p>
            <AddPackage />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <AgencyPackageCard />
        </div>
    </>
}