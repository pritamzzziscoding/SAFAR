import { AddPackage } from "../components/AddPackage"
import { Header } from "../components/Header"
import "../styles/packages.css"

export const Packages = () => {
    return <>
        <Header />
        <div className="package-header">
            <p className="h-20 bg-gradient-to-r from-white to-white bg-clip-text text-transparent text-center text-2xl sm:text-3xl md:text-4xl font-bold italic shadow-4xl">Craft your Perfect Travel Package</p>
            <AddPackage />
        </div>
    </>
}