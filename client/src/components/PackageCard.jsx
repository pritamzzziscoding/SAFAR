import React from 'react';
import '../styles/package-card.css'; // Import the CSS file for margins and paddings

export const PackageCard = () => {
    return (
        <div className="package-card bg-gradient-to-r from-teal-700/80 to-green-600/80 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img
                src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Package Thumbnail"
                className="thumbnail-image"
            />
            <div className="card-content">
                <h2 className="package-name">Beach Getaway</h2>
                <p className="destination">Goa, India</p>
                <p className="price">₹12,000 per person</p>
                <div className="rating">
                    <span className="text-yellow-400">{'★'.repeat(4)}</span>
                    <span className="text-gray-300">{'★'.repeat(1.5)}</span>
                    <span className="ml-2 text-gray-200">(4.0)</span>
                </div>
            </div>
        </div>
    );
};
