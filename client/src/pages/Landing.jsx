import { useNavigate } from "react-router-dom"
import { LandingHeader } from "../components/Home-Header"
import { LandingFooter } from "../components/LandingFooter"
import { WhySection } from "../components/WhySection"
import { useEffect } from "react"
import { checkCookie } from "../services/auth-apis"

export const Landing = () => {
    const navigate = useNavigate()

    const getCookieStatus = async () => {
        try {
            const res = await checkCookie()
            console.log(res)
            if(res.data.success === true){
                navigate("/blogs")
            }else{
                console.log("Cookie set kaar pehle")
            }
        } catch (error) {
            console.log("Error in Cookie Check")
        }
    }

    useEffect(()=>{
        getCookieStatus()
    },[])
    return <>
        <LandingHeader />
        <LandingTitle />
        <Features />
        <WhySection />
        <LandingFooter />
    </>
};

const LandingTitle = () => {
  return (
    <div className="landing-title flex flex-col justify-center gap-10 shadow-2xl">
      <p className="text-4xl md:text-5xl text-teal-100 font-semibold">
        Welcome to SAFAR
      </p>
      <div className="flex flex-col gap-5 items-baseline">
        <div className="text-2xl md:text-3xl text-teal-100">
          Find a Perfect Deal <br />
          For Your next trip
        </div>
        <button className="text-xl bg-gradient-to-r from-teal-400/50 to-teal-700/50 text-stone-50 rounded-xl font-medium shadow-2xl">
          Explore
        </button>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div>
      <h1 className="feature-heading text-center text-xl md:text-3xl lg:text-4xl xl:text-5xl bg-clip-text text-transparent font-medium bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700">
        Popular Destinations
      </h1>
      <div className="feature grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
        <DestinationCard />
      </div>
    </div>
  );
};

const DestinationCard = ({ destination, description, image }) => {
  return (
    <div className="shadow-2xl place-self-center rounded-xl">
      <img
        className="w-full rounded-t-xl"
        src="https://skift.com/wp-content/uploads/2023/07/pexels-editz-central-editors-17117853-scaled-e1690273158715.jpg"
        alt="image"
      />
      <p className="text-xl md:text-2xl sm:text-lg font-semibold text-stone-700 pd-5">
        Dubai
      </p>
      <p className="text-xs sm:text-lg md:text-md pd-5 text-stone-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        nesciunt nemo consectetur.
      </p>
    </div>
  );
};
