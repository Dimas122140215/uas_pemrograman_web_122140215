// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MediaList from './pages/media/MediaList';
import MediaDetail from './pages/media/MediaDetail';
import Profile from './pages/user/Profile';
import YourSpace from './pages/user/YourSpace';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout wrapper */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="media">
            <Route path=":type" element={<MediaList />} />
            <Route path=":type/:id" element={<MediaDetail />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="your-space" element={<YourSpace />} />
        </Route>

        {/* Auth Pages (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback / 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;