import { useState } from "react";

export const RatingForm = ({ bookingId }) => {
    const [formData, setFormData] = useState({
        rating: 1,
        feedback: "",
        review_date: new Date().toISOString().split("T")[0] // Automatically set today's date
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ bookingId, ...formData }); // Logging data for backend submission
    };

    return (
        <form className="flex flex-col gap-3 p-4 bg-gray-100 rounded-md" onSubmit={handleSubmit}>
            <label htmlFor="rating">Rating (1-5)</label>
            <input
                className="p-2 border rounded"
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                required
                value={formData.rating}
                onChange={handleChange}
            />

            <label htmlFor="feedback">Feedback</label>
            <textarea
                className="p-2 border rounded resize-none"
                name="feedback"
                id="feedback"
                rows="4"
                required
                value={formData.feedback}
                onChange={handleChange}
            ></textarea>

            <label htmlFor="review_date">Review Date</label>
            <input
                className="p-2 border rounded bg-gray-200"
                type="date"
                name="review_date"
                id="review_date"
                value={formData.review_date}
                readOnly
            />

            <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit</button>
        </form>
    );
};
