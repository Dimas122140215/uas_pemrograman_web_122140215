// src/components/auth/AuthLayout.jsx
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-lightBlue flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-raleway text-3xl text-secondary font-bold">HobiKu</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;