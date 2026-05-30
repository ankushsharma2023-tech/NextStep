import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function splitValues(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    interests: '',
    skills: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        interests: splitValues(formData.interests),
        skills: splitValues(formData.skills),
      };

      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, payload);
      setMessage(response.data?.message || 'Student profile saved.');
    } catch (error) {
      const responseMessage = error.response?.data?.message;
      setMessage(responseMessage || 'Unable to save student profile right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-darkBg px-4 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-darkSurface/90 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neonCyan">Student Profile</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Log in and store your student info</h1>
          <p className="mt-4 max-w-xl text-gray-400">
            Save your name, interests, and skills to MongoDB so NextStep can personalize roadmaps and recommendations.
          </p>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-gray-300">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-neonCyan/60"
                  placeholder="Student name"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-gray-300">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-neonCyan/60"
                  placeholder="name@example.com"
                  required
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-gray-300">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-neonCyan/60"
                placeholder="Create a password"
                required
              />
            </label>

            <label className="grid gap-2 text-sm text-gray-300">
              Interests
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-neonCyan/60"
                placeholder="AI, Web Development, Data Science"
              />
            </label>

            <label className="grid gap-2 text-sm text-gray-300">
              Skills
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-neonCyan/60"
                placeholder="JavaScript, React, Python"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple px-6 py-3 font-bold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Saving...' : 'Save Student Info'}
            </button>

            {message ? <p className="text-sm text-neonCyan">{message}</p> : null}
          </form>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold">What gets stored</h2>
          <ul className="mt-6 space-y-4 text-sm text-gray-300">
            <li>Name and email for student identity.</li>
            <li>Password hashed in MongoDB through the existing auth route.</li>
            <li>Interests and skills saved as arrays for personalization.</li>
          </ul>
          <p className="mt-8 text-sm text-gray-400">
            If you want a true login-only page next, I can split this into separate register and sign-in screens.
          </p>
        </aside>
      </div>
    </main>
  );
}