import { useState } from "react";

export const FilterForm = ({filters, setFilters, handleSubmit}) => {


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <form className="filter-form bg-teal-500/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-white rounded-2xl w-[90%] md:w-[80%] gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2">
                <label classname="font-medium" style={{color:"white"}} htmlFor="destination">Destination</label>
                <input className="rounded-2xl w-[90%] border text-center"
                    style={{color:"black"}} 
                    type="text" 
                    name="destination" 
                    id="destination" 
                    value={filters.destination} 
                    onChange={handleChange} 
                />
            </div>

            <div className="flex flex-col items-center gap-2">
                <label classname="font-medium" style={{color:"white"}} htmlFor="rating">Minimum Rating</label>
                <input className="rounded-2xl w-[90%] border text-center" 
                    style={{color:"black"}}
                    type="number" 
                    name="rating" 
                    id="rating" 
                    min={1} 
                    max={5} 
                    value={filters.rating} 
                    onChange={handleChange} 
                />
            </div>

            <div className="flex flex-col items-center gap-2">
                <label classname="font-medium" style={{color:"white"}} htmlFor="maximum">Max-Price Per Head</label>
                <input className="rounded-2xl w-[90%] border text-center"
                    style={{color:"black"}} 
                    type="number" 
                    name="maximum" 
                    id="maximum" 
                    min={0} 
                    value={filters.maximum} 
                    onChange={handleChange} 
                />
            </div>

            <div className="flex flex-col items-center gap-2">
                <label classname="font-medium" style={{color:"white"}} htmlFor="sort">SORT</label>
                <input className="border" 
                    type="checkbox" 
                    name="sort" 
                    id="sort" 
                    checked={filters.sort} 
                    onChange={handleChange} 
                />
            </div>

            <button className="sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-teal-700/70 to-teal-900/70 w-30 rounded-4xl place-self-center" type="submit">Apply Filters</button>
        </form>
    );
};
