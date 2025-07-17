import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import {
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import type { RootState } from '../store/store';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
}

interface FavoritesState {
  items: Book[];
  loading: boolean;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
};

// 🔄 Загрузка избранного из Firestore
export const loadFavoritesFromFirestore = createAsyncThunk(
  'favorites/loadFavorites',
  async (uid: string) => {
    const docRef = doc(db, 'favorites', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().items as Book[];
    } else {
      await setDoc(docRef, { items: [] });
      return [];
    }
  }
);

// ✅ Безопасное обновление избранного в Firestore
const syncFavoritesToFirestore = async (uid: string, items: Book[]) => {
  if (!uid || !items) return;
  const docRef = doc(db, 'favorites', uid);
  await setDoc(docRef, { items }, { merge: true });
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      const exists = state.items.find((b) => b.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoritesFromFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFavoritesFromFirestore.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadFavoritesFromFirestore.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// 🔄 Обновление Firestore при изменениях
export const updateFavoritesInFirestore = () => async (
  
  getState: () => RootState
) => {
  const state = getState();
  const uid = state.auth.user?.uid;
  if (uid) {
    await syncFavoritesToFirestore(uid, state.favorites.items);
  }
};

export default favoritesSlice.reducer;













// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { db } from '../firebase';
// import {
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
// } from 'firebase/firestore';
// import { RootState } from '../store/store';

// export interface Book {
//   id: string;
//   title: string;
//   authors: string[];
//   thumbnail: string;
// }

// interface FavoritesState {
//   items: Book[];
//   loading: boolean;
// }

// const initialState: FavoritesState = {
//   items: [],
//   loading: false,
// };

// // 🔄 Загрузка избранного из Firestore
// export const loadFavoritesFromFirestore = createAsyncThunk(
//   'favorites/loadFavorites',
//   async (uid: string) => {
//     const docRef = doc(db, 'favorites', uid);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return docSnap.data().items as Book[];
//     } else {
//       await setDoc(docRef, { items: [] });
//       return [];
//     }
//   }
// );

// // ⬆ Синхронизация избранного в Firestore
// const syncFavoritesToFirestore = async (uid: string, items: Book[]) => {
//   const docRef = doc(db, 'favorites', uid);
//   await updateDoc(docRef, { items });
// };

// const favoritesSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {
//     addFavorite: (state, action: PayloadAction<Book>) => {
//       const exists = state.items.find((b) => b.id === action.payload.id);
//       if (!exists) {
//         state.items.push(action.payload);
//       }
//     },
//     removeFavorite: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((b) => b.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadFavoritesFromFirestore.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loadFavoritesFromFirestore.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(loadFavoritesFromFirestore.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// // 🔄 Обновление в Firestore при изменениях (в компоненте)
// export const updateFavoritesInFirestore = () => async (
//   dispatch: any,
//   getState: () => RootState
// ) => {
//   const state = getState();
//   const uid = state.auth.user?.uid;
//   if (uid) {
//     await syncFavoritesToFirestore(uid, state.favorites.items);
//   }
// };

// export default favoritesSlice.reducer;
