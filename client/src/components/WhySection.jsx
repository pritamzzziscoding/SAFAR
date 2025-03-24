const styling = {
    "marginLeft" : "20px",
    "marginRight" : "20px",
    "marginTop": "100px"
}

export const WhySection = () => {
    return <div style={styling}>
        <p style={{margin: "20px"}} className="text-center text-xl md:text-3xl lg:text-4xl xl:text-5xl bg-clip-text text-transparent font-medium bg-gradient-to-r from-teal-700 via-teal-500 to-teal-700">Why Choose SAFAR?</p>
        <ul className="landing-why grid grid-cols-2 sm:grid-cols-4 gap-5">
            {
                feature.map((obj,idx)=>{
                    return <Card key={idx} img_url={obj.img_url} title={obj.title}/>
                })
            }    
        </ul>
    </div>
}

const Card = ({img_url, title}) =>{
    return <div className="flex flex-col items-center shadow-2xl rounded-xl why-card gap-3">
        <img className="w-[60%]" src={img_url} alt="" />
        <p className="text-center md:text-xl font-medium text-stone-800">{title}</p>
    </div>
}

const feature = [
    {
        img_url : "https://cdn-icons-png.freepik.com/512/8600/8600392.png?ga=GA1.1.2121779801.1736577105",
        title : "Verified Travel Agencies"
    },
    {
        img_url : "https://cdn-icons-png.freepik.com/512/3080/3080267.png?ga=GA1.1.2121779801.1736577105",
        title : "Secure Payments"
    },
    {
        img_url : "https://cdn-icons-png.freepik.com/512/12211/12211426.png?ga=GA1.1.2121779801.1736577105",
        title : "Customizable Itineraries"
    },
    {
        img_url : "https://cdn-icons-png.freepik.com/512/17228/17228712.png?ga=GA1.1.2121779801.1736577105",
        title : "24/7 Support"
    },
]