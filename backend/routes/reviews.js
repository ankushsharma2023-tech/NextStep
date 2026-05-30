const express = require('express');
const CollegeReview = require('../models/CollegeReview');

const router = express.Router();

router.get('/colleges', async (_req, res) => {
  try {
    const reviews = await CollegeReview.find().sort({ createdAt: -1 }).limit(20);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/colleges', async (req, res) => {
  try {
    const { studentName, collegeName, course = '', rating, review } = req.body;

    if (!studentName || !collegeName || !rating || !review) {
      return res.status(400).json({ message: 'All review fields are required' });
    }

    const reviewEntry = await CollegeReview.create({
      studentName,
      collegeName,
      course,
      rating,
      review,
    });

    res.status(201).json({
      message: 'College review added successfully',
      review: reviewEntry,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;