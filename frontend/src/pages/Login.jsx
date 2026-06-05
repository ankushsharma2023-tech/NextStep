import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function splitValues(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
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
      if (mode === 'register') {
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          interests: splitValues(formData.interests),
          skills: splitValues(formData.skills),
        };

        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, payload);
        setMessage(response.data?.message || 'Student profile saved.');
        setMode('login');
        setFormData((current) => ({
          ...current,
          password: '',
        }));
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('nextstep-token', response.data?.token || '');
      localStorage.setItem('nextstep-user', JSON.stringify(response.data?.user || {}));
      setMessage('Logged in successfully.');
      navigate('/');
    } catch (error) {
      const responseMessage = error.response?.data?.message;
      setMessage(responseMessage || 'Unable to complete the request right now.');
    } finally {
      setLoading(false);
    }
  };

  const isLoginMode = mode === 'login';

  return (
    <main className="min-h-screen bg-darkBg px-4 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-darkSurface/90 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neonCyan">Student Account</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">{isLoginMode ? 'Log in to your account' : 'Create a student profile'}</h1>
          <p className="mt-4 max-w-xl text-gray-400">
            {isLoginMode
              ? 'Use your email and password to sign in.'
              : 'Register once, then sign in with the same email and password.'}
          </p>

          <div className="mt-6 inline-flex rounded-full border border-white/10 bg-black/20 p-1 text-sm">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-full px-4 py-2 transition-colors ${isLoginMode ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`rounded-full px-4 py-2 transition-colors ${!isLoginMode ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            {!isLoginMode ? (
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
            ) : null}

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

            <label className="grid gap-2 text-sm text-gray-300">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-neonCyan/60"
                placeholder={isLoginMode ? 'Enter your password' : 'Create a password'}
                required
              />
            </label>

            {!isLoginMode ? (
              <>
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
              </>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple px-6 py-3 font-bold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (isLoginMode ? 'Logging in...' : 'Registering...') : (isLoginMode ? 'Login' : 'Register')}
            </button>

            {message ? <p className="text-sm text-neonCyan">{message}</p> : null}
          </form>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold">How it works</h2>
          <ul className="mt-6 space-y-4 text-sm text-gray-300">
            <li>Login sends a request to <span className="text-white">/api/auth/login</span>.</li>
            <li>Register sends a request to <span className="text-white">/api/auth/register</span>.</li>
            <li>The returned token is stored in localStorage for later protected actions.</li>
          </ul>
          <p className="mt-8 text-sm text-gray-400">
            If login still fails online, check that your deployed frontend points to the correct backend URL and that the backend has <span className="text-white">MONGO_URI</span> and <span className="text-white">JWT_SECRET</span> set.
          </p>
        </aside>
      </div>
    </main>
  );
}
