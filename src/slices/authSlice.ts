import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Вход через Google
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    const provider = new GoogleAuthProvider();

    // 🔄 Всегда запрашивать выбор аккаунта
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 🚪 Выход из аккаунта
export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Восстановление авторизации (например, при перезагрузке)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔄 Вход
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🚪 Выход
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;





// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   user: {
//     uid: string;
//     name: string;
//   } | null;
// }

// const initialState: AuthState = {
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<{ uid: string; name: string }>) {
//       state.user = action.payload;
//     },
//     clearUser(state) {
//       state.user = null;
//     },
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;
