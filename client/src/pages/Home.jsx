import { FilterForm } from "../components/FilterForm"
import { Header } from "../components/Header"
import "../styles/home.css"

export const Home = () => {
    return <>
        <Header />
        <div className="header-home">
            <p className="bg-gradient-to-r from-teal-300 via-teal-50 to-teal-300 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold italic">Discover your perfect destination</p>
            <FilterForm />
        </div>
    </>
}