
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Analytics from './pages/Analytics';
import Roadmaps from './pages/Roadmaps';
import CollegeReviews from './pages/CollegeReviews';
import Counselling from './pages/Counselling';
import AnkushAiSidebar from './components/AnkushAiSidebar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/college-reviews" element={<CollegeReviews />} />
        <Route path="/counselling" element={<Counselling />} />
      </Routes>
      <AnkushAiSidebar />
    </Router>
  );
}

export default App;