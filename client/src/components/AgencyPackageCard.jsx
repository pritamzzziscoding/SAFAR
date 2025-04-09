import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon from react-icons
import '../styles/agency-package.css'; // Import the CSS file for padding and margin
import { togglePackage } from '../services/update';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { deletePackage } from '../services/delete-data';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { NavLink } from "react-router-dom"

export const AgencyPackageCard = ({pkg, setRefresh, setEdit}) => {
    const [isActive, setIsActive] = useState(pkg.IsActive); // State to manage active status
    const [toggleMenu, setToggleMenu] = useState(false)

    const toggleActiveStatus = async () => {
        try {
            const res = await togglePackage({
                PackageID : pkg.PackageID,
                IsActive : +(!isActive)
            })
            if(res.data.success === true){
                console.log("Successfully Toggled")
            }else{
                return;
            }
        } catch (error) {
            console.log(error)
        }
        setIsActive(!isActive); // Toggle the active status
    };

    const handleDelete = async () => {
        try {
            const res = await deletePackage({PackageID : pkg.PackageID})
            if(res.data.success){
                console.log("Data Deleted")
            }else{
                console.log("Data not deleted")
            }
        } catch (error) {
            console.log(error)
        }
        setRefresh((prev) => !prev)
    }

    const handleEdit = () => {
        setEdit(pkg)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    return (
        <li className="agency-package-card bg-white shadow-lg rounded-lg p-4 relative overflow-hidden transform transition-transform duration-300 hover:scale-101">
            <img 
                src={pkg.ImgURL || "https://img.freepik.com/premium-vector/cheerful-hand-drawn-cartoon-illustration-two-tourists-exploring-destination_1120563-3255.jpg"} 
                alt="Package Thumbnail" 
                className="package-image w-full h-48 object-cover rounded-md"
            />
            <div className="flex justify-between items-center mt-2 gap-2 package-name relative">
                <h2 className="truncate text-xl font-bold w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {pkg.Title}
                </h2>
                <HiOutlineDotsVertical onClick={()=>setToggleMenu((prev)=>!prev)} className='text-xl'/>
                <div className={`${toggleMenu ? "" : "hidden"} toggle-btn rounded flex flex-col w-15 bg-white gap-1 top-0 right-5 absolute shadow-xl`}>
                    <p onClick={handleEdit} className='cursor-pointer hover:bg-gray-100 text-sm font-normal'>Edit</p>
                    <p onClick={handleDelete} className='cursor-pointer hover:bg-gray-100 text-sm font-normal'>Delete</p>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className="flex items-center mt-2 gap-2">
                    <label className="toggle-label flex items-center">
                        <input 
                            type="checkbox" 
                            checked={isActive} 
                            onChange={toggleActiveStatus} 
                            className="toggle-checkbox" 
                        />
                        <span className={`toggle ${isActive ? 'active' : 'inactive'}`}></span>
                    </label>
                    <span className="ml-2 text-md font-medium flex flex-start">{isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className='flex gap-2'>
                    <NavLink to={`/packages/${pkg.PackageID}`}><p className='text-green-700'>bookings</p></NavLink>
                    <NavLink to={`/reviews/${pkg.PackageID}`}><p className='text-green-700'>reviews</p></NavLink>
                </div>
            </div>
        </li>
    );
};
//Sahi se handle karna hoga