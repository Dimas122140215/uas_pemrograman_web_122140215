// src/components/auth/AuthLayout.jsx
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-lightBlue flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-raleway text-3xl font-bold text-secondary">HobiKu</h1>
        </div>

        {/* ✅ Ensure this container is visible */}
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;