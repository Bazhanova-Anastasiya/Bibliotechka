import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginWithGoogle, logout } from '../slices/authSlice';
import { Link } from 'react-router-dom';

const LoginButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link
            to="/favorites"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Избранное
          </Link>

          <span className="text-sm text-gray-800 dark:text-gray-200">
            <Link to="/profile" className="hover:underline">
              {user.displayName}
            </Link>
          </span>

          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Выйти
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Войти
        </button>
      )}
    </div>
  );
};

export default LoginButton;
