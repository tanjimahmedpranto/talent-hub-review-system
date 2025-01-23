import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { servicesData } from "../data/items";
import Rating from "../components/Rating";
import axios from "axios";
import Modal from "../components/Modal";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const service = servicesData.find((item) => item.id === Number(id));

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); // Add loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/reviews/service/${id}`
        );
        // Sort reviews by createdAt in descending order
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setReviews(sortedReviews);

        // NEW CODE: Check if the current user has already reviewed the service
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await axios.get(`${API_BASE_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userId = userResponse.data._id;
          const userHasReviewed = response.data.some(
            (review) => review.userId._id === userId
          );
          setHasReviewed(userHasReviewed);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchReviews();
  }, [id, token]);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Ensure hasReviewed is set to false if there is no token
  useEffect(() => {
    if (!token) {
      setHasReviewed(false);
    }
  }, [token]);

  if (!service) {
    return <div>Service not found!</div>;
  }

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (rating && comment) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("You must be logged in to submit a review.");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const newReview = {
          serviceId: service.id,
          rating,
          comment,
        };

        await axios.post(`${API_BASE_URL}/api/reviews`, newReview, config);

        const updatedReviewsResponse = await axios.get(
          `${API_BASE_URL}/api/reviews/service/${id}`
        );
        setReviews(updatedReviewsResponse.data);
        setRating(0);
        setComment("");
        setErrorMessage("");

        setHasReviewed(true);
      } catch (error) {
        console.error("Error submitting review", error);
        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage("You must be logged in to submit a review.");
          } else {
            setErrorMessage("An error occurred while submitting your review.");
          }
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    } else {
      alert("Please provide both a rating and a comment.");
    }
  };

  // CORRECTION: Calculate the percentage of each star rating
  const ratingCounts = reviews.reduce(
    (acc, review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        acc[review.rating - 1]++;
      }
      return acc;
    },
    [0, 0, 0, 0, 0]
  );

  const totalReviews = reviews.length;

  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews > 0 ? (count / totalReviews) * 100 : 0
  );

  // CORRECTION: Calculate the average rating
  const averageRating = totalReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-start justify-between gap-6 mb-8">
        {/* Left Section: Image */}
        <div className="w-1/4">
          <img
            src="/service.jpg" // Replace with actual image URL
            alt={service.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Center Section: Service Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">
            {service.name}
          </h1>
          <p className="text-gray-600 mb-2">
            <strong>Provider:</strong> {service.provider}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Description:</strong> {service.description}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <strong>Price:</strong> {service.price}
          </p>
        </div>

        {/* Right Section: Book Now Button */}
        <div className="self-start">
          <button className="flex items-center gap-2 px-6 py-2 bg-gold-700 text-white font-medium rounded-lg hover:bg-gold-600 transition duration-200">
            {/* Bookmark Icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2m0 15-5-2.18L7 18V5h10z" />
            </svg>
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full md:w-1/2 mb-8 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Reviews</h2>
        {/* ADV RAT: Advanced Rating Component */}
        {totalReviews > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.round(averageRating)
                      ? "text-gold-700"
                      : "text-gray-300"
                  } me-1`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {averageRating.toFixed(2)}
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                out of
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                5
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {totalReviews} global ratings
            </p>
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div className="flex items-center mt-4" key={index}>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {star} star
                </a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-200">
                  <div
                    className="h-5 bg-gold-700 rounded"
                    style={{ width: `${ratingPercentages[star - 1]}%` }} // This accesses the correct percentage
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {ratingPercentages[star - 1].toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}
        {loading ? (
          <p className="text-gray-600">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-600">
            No reviews yet. Be the first to review this service!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, 4).map((review) => (
              <div
                key={review._id || review.id}
                className="bg-[#fefbec] p-4 rounded shadow-md text-gray-700"
              >
                <div className="flex items-center mb-2">
                  <img
                    className="w-8 h-8 me-2 rounded-full"
                    src={review.profilePicture || "/usericon.jpg"}
                    alt={review.name}
                  />
                  <h3 className="font-bold mb-1">
                    {review.userId?.name || "User"}
                  </h3>
                </div>
                <Rating value={review.rating} color="#866913" />
                <br />
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
            {/* Show More Reviews Button */}
            {reviews.length > 4 && (
              <button
                className="mt-4 bg-gold-700 text-white px-4 py-2 rounded hover:bg-gold-600 transition"
                onClick={() => setIsModalOpen(true)}
              >
                Show More Reviews
              </button>
            )}
          </div>
        )}
      </div>
      {/* Modal for displaying all reviews */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          All Reviews
        </h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id || review.id}
              className="bg-[#fefbec] p-4 rounded shadow-md text-gray-700"
            >
              <div className="flex items-center mb-2">
                <img
                  className="w-8 h-8 me-2 rounded-full"
                  src={review.profilePicture || "/usericon.jpg"}
                  alt={review.name}
                />
                <h3 className="font-bold">{review.userId?.name || "User"}</h3>
              </div>
              <Rating value={review.rating} color="#866913" />
              <p className="text-sm text-gray-500 mb-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Add Review Section */}
      <div className="w-full md:w-1/2 p-6 bg-[#eeeeee] rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Write a Review
        </h2>
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        {hasReviewed ? ( // NEW CODE: Conditionally render the review form or info message
          <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
            You already reviewed and commented on this service.
          </div>
        ) : (
          <form onSubmit={submitReviewHandler}>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block mb-2 font-semibold text-gray-600"
              >
                Rating
              </label>
              <select
                id="rating"
                className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block mb-2 font-semibold text-gray-600"
              >
                Comment
              </label>
              <textarea
                id="comment"
                className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gold-700 text-white py-2 rounded hover:bg-gold-600 transition-colors duration-200"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
