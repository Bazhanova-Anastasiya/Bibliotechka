import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
}

interface BooksState {
  items: Book[];
  query: string;
  loading: boolean;
  error: string | null;
  startIndex: number;
  hasMore: boolean;
}

const initialState: BooksState = {
  items: [],
  query: 'Jane Austen',
  loading: false,
  error: null,
  startIndex: 0,
  hasMore: true,
};

const MAX_RESULTS = 20;

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, startIndex }: { query: string; startIndex: number }) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${MAX_RESULTS}`
    );

    return (
      response.data.items?.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Без автора'],
        description: item.volumeInfo.description || 'Нет описания.',
        thumbnail:
          item.volumeInfo.imageLinks?.thumbnail ||
          'https://via.placeholder.com/128x195.png?text=Нет+изображения',
      })) || []
    );
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    resetBooks(state) {
      state.items = [];
      state.startIndex = 0;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        const newBooks = action.payload;

        const existingIds = new Set(state.items.map((book) => book.id));
        const filteredBooks = newBooks.filter((book) => !existingIds.has(book.id));

        state.items.push(...filteredBooks);
        state.startIndex += newBooks.length;
        state.hasMore = newBooks.length > 0;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка при загрузке книг.';
      });
  },
});

export const { setQuery, resetBooks } = booksSlice.actions;

export default booksSlice.reducer;














// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// interface Book {
//   id: string;
//   title: string;
//   authors: string[];
//   thumbnail: string;
//   description: string;
// }

// interface BooksState {
//   items: Book[];
//   loading: boolean;
//   error: string | null;
//   startIndex: number;
//   hasMore: boolean;
//   query: string;
// }

// const initialState: BooksState = {
//   items: [],
//   loading: false,
//   error: null,
//   startIndex: 0,
//   hasMore: true,
//   query: 'Jane Austen', // Запрос по умолчанию
// };

// const MAX_RESULTS = 12;

// export const fetchBooks = createAsyncThunk<
//   Book[],
//   { query: string; startIndex: number },
//   { rejectValue: string }
// >('books/fetchBooks', async ({ query, startIndex }, thunkAPI) => {
//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
//         query
//       )}&startIndex=${startIndex}&maxResults=${MAX_RESULTS}`
//     );

//     const books = response.data.items?.map((item: any) => ({
//       id: item.id,
//       title: item.volumeInfo.title || 'Без названия',
//       authors: item.volumeInfo.authors || ['Неизвестный автор'],
//       thumbnail:
//         item.volumeInfo.imageLinks?.thumbnail ||
//         'https://via.placeholder.com/128x195.png?text=No+Image',
//       description: item.volumeInfo.description || 'Нет описания.',
//     })) || [];

//     return books;
//   } catch (error) {
//     return thunkAPI.rejectWithValue('Ошибка загрузки книг');
//   }
// });

// const booksSlice = createSlice({
//   name: 'books',
//   initialState,
//   reducers: {
//     setQuery(state, action: PayloadAction<string>) {
//       state.query = action.payload;
//       state.items = [];
//       state.startIndex = 0;
//       state.hasMore = true;
//     },
//     resetBooks(state) {
//       state.items = [];
//       state.startIndex = 0;
//       state.hasMore = true;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBooks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBooks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items.push(...action.payload);
//         state.startIndex += MAX_RESULTS;
//         state.hasMore = action.payload.length === MAX_RESULTS;
//       })
//       .addCase(fetchBooks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Ошибка';
//       });
//   },
// });

// export const { setQuery, resetBooks } = booksSlice.actions;
// export default booksSlice.reducer;
