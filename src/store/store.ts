import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../slices/booksSlice';
import authReducer from '../slices/authSlice';
import favoritesReducer from '../slices/favoritesSlice';
import themeReducer from '../slices/themeSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useAppDispatch } from '../store/hooks';
