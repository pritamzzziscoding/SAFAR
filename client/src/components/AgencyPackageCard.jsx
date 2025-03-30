import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon from react-icons
import '../styles/agency-package.css'; // Import the CSS file for padding and margin
import { togglePackage } from '../services/update';

export const AgencyPackageCard = ({pkg}) => {
    const [isActive, setIsActive] = useState(pkg.IsActive); // State to manage active status

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

    return (
        <li className="agency-package-card bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <img 
                src={pkg.ImgURL} 
                alt="Package Thumbnail" 
                className="package-image w-full h-48 object-cover rounded-md"
            />
            <div className="flex justify-between items-center">
                <h2 className="package-name truncate text-xl w-[80%] font-bold">{pkg.Title}</h2>
                <FaEdit className="w-[20%] edit-icon text-teal-600 cursor-pointer hover:text-teal-800 transition-colors duration-200" />
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