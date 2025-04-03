import { useState } from "react";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import "../styles/rating-form.css"; // Separate CSS for margins & paddings
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import { giveRating } from "../services/postData";

const labels = {
  0.5: "😡 Oh no! Did we ruin your trip?",
  1: "🙄 Not what you expected?",
  1.5: "😬 Could be better...",
  2: "😕 Meh... Average",
  2.5: "😐 Okay, but nothing special!",
  3: "🙂 Decent trip!",
  3.5: "😊 Pretty good experience!",
  4: "😃 Had a great time!",
  4.5: "🤩 Loved it! Amazing trip!",
  5: "🚀 Unforgettable! Best trip ever!"
};

// Function to get label text
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export const RatingForm = () => {
  const {id} = useParams()
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await giveRating({
        bookingID : id,
        Rating : value,
        Feedback : description
      });

      if(res.data.status === true){
        console.log("Feedback submitted")
      }else{
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Header></Header>
      <form
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden p-10 space-y-10 transition-all hover:shadow-2xl transform hover:scale-[1.02]"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <h2 className="text-3xl font-semibold text-teal-700 text-center">
           Rate Your Experience
        </h2>

        {/* Rating Section (Centered & Larger) */}
        <div className="flex flex-col items-center justify-center gap-5">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => setValue(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              size="huge" // Increased star size
              sx={{
                "& .MuiRating-iconFilled": { color: "gold" }, // Make stars golden when filled
                "& .MuiRating-iconEmpty": { color: "gray" }, // Keep empty stars gray
                fontSize: "3.5rem" // Make stars bigger
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box className="text-teal-600 font-medium mt-5 text-center text-xl">
                {labels[hover !== -1 ? hover : value]}
              </Box>
            )}
          </Box>
        </div>

        {/* Feedback Section */}
        <div className="flex flex-col gap-4">
          <label htmlFor="feedback" className="font-medium text-gray-700 text-xl">
             Your Feedback
          </label>
          <textarea
            className="p-4 border border-gray-900 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 transition text-lg"
            name="feedback"
            id="feedback"
            rows="5"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your experience..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition text-lg"
        >
           Submit Review
        </button>
      </form>
    </div>
  );
};
