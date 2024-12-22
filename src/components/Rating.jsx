import PropTypes from "prop-types";

const Rating = ({ value, text, color = "#866913" }) => {
  const stars = [1, 2, 3, 4, 5]; // Represents 5 stars

  return (
    <div className="flex items-center space-x-1 rating">
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill={value >= star ? color : value >= star - 0.5 ? color : "none"}
          viewBox="0 0 24 24"
          stroke={color}
          className="h-5 w-5 drop-shadow-md"
        >
          {value >= star ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.318l2.91 5.9 6.49.943-4.7 4.57 1.11 6.463L12 17.805l-5.81 3.389 1.11-6.463-4.7-4.57 6.49-.943L12 4.318z"
            />
          ) : value >= star - 0.5 ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.318l2.91 5.9 6.49.943-4.7 4.57 1.11 6.463L12 17.805l-5.81 3.389 1.11-6.463-4.7-4.57 6.49-.943L12 4.318z"
              />
              <path
                fill="none"
                d="M12 4.318l-2.91 5.9-6.49.943 4.7 4.57-1.11 6.463L12 17.805l5.81 3.389-1.11-6.463 4.7-4.57-6.49-.943-2.91-5.9z"
              />
            </>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.318l-2.91 5.9-6.49.943 4.7 4.57-1.11 6.463L12 17.805l5.81 3.389-1.11-6.463 4.7-4.57-6.49-.943-2.91-5.9z"
            />
          )}
        </svg>
      ))}
      {text && <span className="ml-2 text-sm">{text}</span>}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
