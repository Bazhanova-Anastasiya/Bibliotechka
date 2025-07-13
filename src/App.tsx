import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import { useAppDispatch } from './store/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser } from './slices/authSlice';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // 🔁 Восстановление авторизации при перезагрузке
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
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
          {/* Если хочешь — можешь добавить <Route path="/profile" ... /> */}
        </Routes>
        {/* ✅ ВСТАВИТЬ КНОПКУ "НАВЕРХ" ЗДЕСЬ */}
        <ScrollToTopButton />
      </main>
    </div>
  );
};

export default App;










// import { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store/store';
// import { toggleTheme } from './slices/themeSlice';

// import HomePage from './pages/HomePage';
// import FavoritesPage from './pages/FavoritesPage';
// import Navbar from './components/Navbar';

// import './index.css';
// import ScrollToTopButton from './components/ScrollToTopButton';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import { setUser, clearUser } from './slices/authSlice';
// import { loadFavoritesFromFirestore } from './slices/favoritesSlice';

// function App() {
//   const theme = useSelector((state: RootState) => state.theme.mode);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', theme === 'dark');
//   }, [theme]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch(setUser({ uid: user.uid, name: user.displayName || 'Пользователь' }));
//         dispatch(loadFavoritesFromFirestore(user.uid));
//       } else {
//         dispatch(clearUser());
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/favorites" element={<FavoritesPage />} />
//         </Routes>
//         <ScrollToTopButton />
//       </Router>
//     </div>
//   );
// }

// export default App;
