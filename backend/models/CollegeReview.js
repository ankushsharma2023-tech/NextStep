const mongoose = require('mongoose');

const CollegeReviewSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  collegeName: { type: String, required: true },
  course: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CollegeReview', CollegeReviewSchema);