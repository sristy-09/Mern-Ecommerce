import { useState } from "react";
import "../componentStyles/Rating.css";

function Rating({ value, onRatingChange, disabled }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  // Handle Star hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };

  // Mouse Leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  // Handle Click
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);

      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  // Functiions to generate stars based on the selected rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : "empty"}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{ pointerEvents: disabled ? "none" : "auto" }} // Disabling the mouse events
        >
          ☆
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="rating">{generateStars()}</div>
    </div>
  );
}

export default Rating;
