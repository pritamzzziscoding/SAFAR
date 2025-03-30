import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon from react-icons
import '../styles/agency-package.css'; // Import the CSS file for padding and margin

export const AgencyPackageCard = () => {
    const [isActive, setIsActive] = useState(true); // State to manage active status

    const toggleActiveStatus = () => {
        setIsActive(!isActive); // Toggle the active status
    };

    return (
        <div className="agency-package-card bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <img 
                src="https://images.pexels.com/photos/1486577/pexels-photo-1486577.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Package Thumbnail" 
                className="package-image w-full h-48 object-cover rounded-md"
            />
            <div className="flex justify-between items-center mt-2">
                <h2 className="package-name text-xl font-bold">Beach Adventure</h2>
                <FaEdit className="edit-icon text-teal-600 cursor-pointer hover:text-teal-800 transition-colors duration-200" />
            </div>
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
        </div>
    );
};