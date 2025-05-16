import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MediaList from './pages/MediaList';
import MediaDetail from './pages/MediaDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="media">
            <Route path=":type" element={<MediaList />} />
            <Route path=":type/:id" element={<MediaDetail />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;