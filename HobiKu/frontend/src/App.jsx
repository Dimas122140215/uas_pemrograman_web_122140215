// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import MediaList from './pages/media/MediaList';
import MediaDetail from './pages/media/MediaDetail';
import Profile from './pages/user/Profile';
import YourSpace from './pages/user/YourSpace';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './components/auth/AuthLayout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout – Navbar/Footer included */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="media" element={<MediaList />}>
            <Route index element={<Navigate replace to="/media/all" />} />
            <Route path=":type" element={<MediaList />} />
            <Route path=":type/:id" element={<MediaDetail />} />
          </Route>

          <Route path="profile" element={<Profile />} />
          <Route path="your-space" element={<YourSpace />} />
        </Route>

        {/* Auth Layout – No Navbar */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<AuthLayout />}>
          <Route index element={<Register />} />
        </Route>

        {/* Fallback / 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;