const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  const { serviceId, rating, comment } = req.body;
  const userId = req.user.id;
  // Log the received review data

  if (!serviceId || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const review = new Review({
      serviceId,
      userId,
      rating,
      comment,
      createdAt: new Date(),
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("Error saving review:", error); // Log the error
    res.status(500).json({ message: "Error saving review." });
  }
});

// GET all reviews for a service
router.get("/service/:serviceId", async (req, res) => {
  try {
    const reviews = await Review.find({
      serviceId: req.params.serviceId,
    }).populate("userId", "name email");
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err); // Log the error
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
