import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import { useAppDispatch } from './store/hooks';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import { setUser } from './slices/authSlice';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // 🔁 Восстановление авторизации при перезагрузке
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user?.toJSON() as User));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>  
        <ScrollToTopButton />
      </main>
    </div>
  );
};

export default App;
