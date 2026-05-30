import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, MessageSquareQuote, GraduationCap } from 'lucide-react';
import PageShell from '../components/PageShell';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CollegeReviews() {
  const [formData, setFormData] = useState({
    studentName: '',
    collegeName: '',
    course: '',
    rating: '5',
    review: '',
  });
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/reviews/colleges`);
        setReviews(response.data || []);
      } catch (error) {
        setReviews([]);
      }
    };

    loadReviews();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/reviews/colleges`, {
        ...formData,
        rating: Number(formData.rating),
      });

      setReviews((current) => [response.data.review, ...current].slice(0, 20));
      setFormData({
        studentName: '',
        collegeName: '',
        course: '',
        rating: '5',
        review: '',
      });
      setStatus('Review added successfully.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to save review right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      theme="reviews"
      eyebrow="College Reviews"
      title="Students can review the college they study in"
      subtitle="Capture real student feedback with ratings, course details, and text reviews saved in MongoDB."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-darkSurface/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center gap-2 text-rose-200">
            <GraduationCap className="h-5 w-5" />
            <h2 className="text-xl font-bold text-white">Add a review</h2>
          </div>

          <div className="mt-5 grid gap-4">
            <input name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Your name" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-rose-300/70" required />
            <input name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College name" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-rose-300/70" required />
            <input name="course" value={formData.course} onChange={handleChange} placeholder="Course or branch" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-rose-300/70" />
            <select name="rating" value={formData.rating} onChange={handleChange} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-rose-300/70">
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
            <textarea name="review" value={formData.review} onChange={handleChange} rows="5" placeholder="Write your review" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-rose-300/70" required />

            <button type="submit" disabled={loading} className="rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-600 px-6 py-3 font-bold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>

            {status ? <p className="text-sm text-rose-200">{status}</p> : null}
          </div>
        </form>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center gap-2 text-rose-200">
            <MessageSquareQuote className="h-5 w-5" />
            <h2 className="text-xl font-bold text-white">Recent reviews</h2>
          </div>

          <div className="mt-5 grid gap-4">
            {reviews.length > 0 ? reviews.map((review) => (
              <article key={review._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{review.collegeName}</h3>
                    <p className="text-sm text-gray-400">{review.studentName}{review.course ? ` • ${review.course}` : ''}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm font-semibold text-rose-200">
                    <Star className="h-4 w-4 fill-current" />
                    {review.rating}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-300">{review.review}</p>
              </article>
            )) : (
              <p className="text-sm text-gray-400">No reviews yet. Add the first one.</p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}