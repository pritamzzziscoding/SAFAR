import { useEffect, useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { logout, details } from "../services/auth-apis";
import { updateImage, updateName, updatePassword } from "../services/update";

export const Profile = ({status, image, setImage}) => {
    const navigate = useNavigate()
    const [detail, setDetail] = useState({})
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
    });
    const handleClick = async () => {
        try {
            const res = await logout();
            console.log(res.data.message)
            if(res.status === 200){
                navigate("/")
            }else{
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getDetails = async () => {
        try {
            const t = await details()
            if(t.data.success === true){
                setDetail(t.data.result)
            }else{
                alert(t.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDetails()
    },[image, formData])

    return <div className={`${status} z-10 profile-page absolute top-17 right-2 bg-gradient-to-tr from-stone-50 to-stone-200/80 shadow-2xl rounded-2xl`}>
        <div className="grid gap-3">
            <div className="flex gap-5 items-center">
                <div className="w-20 h-20 bg-amber-400 rounded"><img className="w-full h-full" src={detail.image_url} alt="" /></div>
                <div className="font-medium">
                    <div className="text-stone-800 font-semibold">{`${detail.firstname} ${detail.lastname}`} | {detail.type}</div>
                    <div className="text-green-700">{detail.email}</div>
                    <div>{detail.phoneno}</div>
                </div>
            </div>
            <div className="grid gap-3">
                <ImageUrlForm image={image} setImage={setImage}/>
                <ProfileForm formData={formData} setFormData={setFormData}/>
                <ChangePasswordForm />
            </div>
        </div>
        <div className="flex justify-center">
            <button onClick={handleClick} className="logout-btn flex gap-2 items-center bg-red-500 rounded text-white font-medium">Logout <RiLogoutBoxLine /></button>
        </div>
        
    </div>
};

const ProfileForm = ({formData, setFormData}) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateName(formData)
            if(res.data.success === true){
                console.log("Naam set ho gya")
                setFormData({
                    firstname: "",
                    lastname: "",
                })
            }else{
                console.log("kuch galat hai front end mei")
            }
        } catch (error) {
            console.log("Sahi se name update nehi hua keeda dekh")
        }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container flex justify-between items-center">
        <label htmlFor="firstname">First Name: </label>
        <input
          className="w-[50%] border-2 border-teal-700 bg-teal-50/50 rounded-2xl text-teal-700"
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-container flex justify-between items-center">
        <label htmlFor="lastname">Last Name: </label>
        <input
          className="w-[50%] border-2 border-teal-700 bg-teal-50/50 rounded-2xl text-teal-700"
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>

      <button
        className="image-btn bg-green-600/70 text-white rounded-lg font-medium"
        type="submit"
      >
        Change
      </button>
    </form>
  );
};

const ChangePasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            alert("New password and confirm password do not match!");
            return;
        }
        try {
            const res = await updatePassword(passwordData)
            if(res.data.success === true){
                alert("Password Change ho gya")
            }else{
                alert(res.data.message)
            }
        } catch (error) {
            console.log("Password change nehi hua reh!!!!")
        }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container flex justify-between items-center">
        <label htmlFor="current">Current Password: </label>
        <input
          className="w-[44%] border-2 border-teal-700 bg-teal-50/50 rounded-2xl text-teal-700"
          type="password"
          name="current"
          id="current"
          value={passwordData.current}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>

      <div className="form-container flex justify-between items-center">
        <label htmlFor="new">New Password: </label>
        <input
          className="w-[44%] border-2 border-teal-700 bg-teal-50/50 rounded-2xl text-teal-700"
          type="password"
          name="new"
          id="new"
          value={passwordData.new}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>

      <div className="form-container flex justify-between items-center">
        <label htmlFor="confirm">Confirm Password: </label>
        <input
          className="w-[44%] border-2 border-teal-700 bg-teal-50/50 rounded-2xl text-teal-700"
          type="password"
          name="confirm"
          id="confirm"
          value={passwordData.confirm}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </div>

      <button
        className="image-btn bg-green-600/70 text-white rounded-lg font-medium"
        type="submit"
      >
        Change
      </button>
    </form>
  );
};

const ImageUrlForm = ({image, setImage}) => {
    const handleChange = (e) => {
        const {name, files} = e.target
        console.log(files)
        setImage({...image, [name] : files[0]})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("image", image.image);
        console.log("yeh hai ",formData)

        try {
            console.log("Lora", image.image)
            console.log(formData)
            const res = await updateImage(formData)
            if(res.data.success === true){
                console.log("Image sahi se update ho gya");
                setImage({image : null})
            }
        } catch (error) {
            console.log("Image update karte samay server mei keeda mila hai")
        }
    }

    return <form className="" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
            <label htmlFor="image_url">Upload DP:</label>
            <input className="w-[50%] border-2 border-teal-700 bg-teal-50/50 rounded-2xl text-teal-700" type="file" name="image" id="image" onChange={handleChange} required autoComplete="off"/>
        </div>
        <button className="image-btn bg-green-600/70 text-white rounded-lg font-medium" type="submit">Change</button>
    </form>
    
};
