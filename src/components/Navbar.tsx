import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import { useTheme } from '../theme/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Название */}
      <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
        Библиотечка
      </Link>

      {/* Панель управления */}
      <div className="flex items-center gap-4">
        {/* Переключатель темы */}
        <button
          onClick={toggleTheme}
          className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition"
          title="Сменить тему"
        >
          {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
        </button>

        {/* Кнопки авторизации */}
        <LoginButton />
      </div>
    </header>
  );
};

export default Navbar;
















// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { toggleTheme } from '../slices/themeSlice';
// import { auth, provider } from '../firebase';
// import { signInWithPopup, signOut } from 'firebase/auth';
// import { setUser, clearUser } from '../slices/authSlice';

// import { Moon, Sun, Heart } from 'lucide-react';

// function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useSelector((state: RootState) => state.theme.mode);
//   const user = useSelector((state: RootState) => state.auth.user);

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//   };

//   const handleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       if (user) {
//         dispatch(setUser({ uid: user.uid, name: user.displayName || 'Пользователь' }));
//       }
//     } catch (error) {
//       console.error('Ошибка входа', error);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     dispatch(clearUser());
//     navigate('/');
//   };

//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
//       <Link to="/" className="flex items-center space-x-2">
//         {/* <img src="/suitcase-icon.png" alt="Logo" className="w-6 h-6" /> */}
//         <span className="text-xl font-bold">Библиотечка</span>
//       </Link>

//       <div className="flex items-center space-x-4">
//         <button
//           onClick={handleThemeToggle}
//           className="text-yellow-500 dark:text-white hover:scale-110 transition-transform"
//         >
//           {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
//         </button>

//         <Link
//           to="/favorites"
//           className="flex items-center space-x-1 hover:text-red-500 transition-colors"
//         >
//           <Heart size={20} />
//           <span>Избранное</span>
//         </Link>

//         {!user ? (
//           <button
//             onClick={handleLogin}
//             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//           >
//             Войти
//           </button>
//         ) : (
//           <div className="flex items-center space-x-2">
//             <span className="font-medium underline">{user.name}</span>
//             <button
//               onClick={handleLogout}
//               className="text-sm text-gray-600 hover:text-red-500 transition"
//             >
//               Выйти
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Navbar;


















// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store/store';
// import { toggleTheme } from '../slices/themeSlice';
// import { auth, provider } from '../firebase';
// import { signInWithPopup, signOut } from 'firebase/auth';
// import { setUser, clearUser } from '../slices/authSlice';

// import { Moon, Sun, Heart } from 'lucide-react';

// function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useSelector((state: RootState) => state.theme.mode);
//   const user = useSelector((state: RootState) => state.auth.user);

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//   };

//   const handleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       if (user) {
//         dispatch(setUser({ uid: user.uid, name: user.displayName || 'Пользователь' }));
//       }
//     } catch (error) {
//       console.error('Ошибка входа', error);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     dispatch(clearUser());
//     navigate('/');
//   };

//   return (
//     <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
//       <Link to="/" className="flex items-center space-x-2">
//         <img src="/suitcase-icon.png" alt="Logo" className="w-6 h-6" />
//         <span className="text-xl font-bold">Библиотечка</span>
//       </Link>

//       <div className="flex items-center space-x-4">
//         <button
//           onClick={handleThemeToggle}
//           className="text-yellow-500 dark:text-white hover:scale-110 transition-transform"
//         >
//           {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
//         </button>

//         <Link
//           to="/favorites"
//           className="flex items-center space-x-1 hover:text-red-500 transition-colors"
//         >
//           <Heart size={20} />
//           <span>Избранное</span>
//         </Link>

//         {!user ? (
//           <button
//             onClick={handleLogin}
//             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//           >
//             Войти
//           </button>
//         ) : (
//           <div className="flex items-center space-x-2">
//             <span className="font-medium underline">{user.name}</span>
//             <button
//               onClick={handleLogout}
//               className="text-sm text-gray-600 hover:text-red-500 transition"
//             >
//               Выйти
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Navbar;
