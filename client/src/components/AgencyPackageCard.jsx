import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon from react-icons
import '../styles/agency-package.css'; // Import the CSS file for padding and margin
import { togglePackage } from '../services/update';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { deletePackage } from '../services/delete-data';
import { HiOutlineDotsVertical } from "react-icons/hi";

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
    }


    return (
        <li className="agency-package-card bg-white shadow-lg rounded-lg overflow-hidden p-4 relative transform transition-transform duration-300 hover:scale-105">
            <img 
                src={pkg.ImgURL} 
                alt="Package Thumbnail" 
                className="package-image w-full h-48 object-cover rounded-md"
            />
            <div className="flex justify-between items-center mt-2 gap-2 package-name relative">
                <h2 className="truncate text-xl font-bold flex">{pkg.Title}</h2>
                <HiOutlineDotsVertical onClick={()=>setToggleMenu((prev)=>!prev)} className='text-xl'/>
                <div className={`${toggleMenu ? "" : "hidden"} toggle-btn rounded flex flex-col w-15 bg-white gap-1 top-0 right-5 absolute shadow-xl`}>
                    <p onClick={handleEdit} className='cursor-pointer hover:bg-gray-100'>Edit</p>
                    <p onClick={handleDelete} className='cursor-pointer hover:bg-gray-100'>Delete</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className="flex items-center mt-2 gap-2">
                    <label className="toggle-label">
                        <input 
                            type="checkbox" 
                            checked={isActive} 
                            onChange={toggleActiveStatus} 
                            className="toggle-checkbox" 
                        />
                        <span className={`toggle ${isActive ? 'active' : 'inactive'}`}></span>
                    </label>
                    <span className="ml-2 text-md font-medium">{isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className='cursor-pointer'>
                    <p className='text-green-700'>bookings....</p>
                </div>
            </div>
        </li>
    );
};