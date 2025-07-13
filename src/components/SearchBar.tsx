import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchBooks, resetBooks, setQuery } from '../slices/booksSlice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed) {
      dispatch(setQuery(trimmed));
      dispatch(resetBooks());
      dispatch(fetchBooks({ query: trimmed, startIndex: 0 }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex justify-center py-4">
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите название книги или автора"
          className="flex-grow px-4 py-2 rounded-l border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition"
        >
          Найти
        </button>
      </div>
    </div>
  );
};

export default SearchBar;











// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { setQuery, resetBooks, fetchBooks } from '../slices/booksSlice';
// import { RootState } from '../store/store';

// function SearchBar() {
//   const dispatch = useDispatch();
//   const currentQuery = useSelector((state: RootState) => state.books.query);
//   const [input, setInput] = useState(currentQuery);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     dispatch(setQuery(input));
//     dispatch(resetBooks());
//     dispatch(fetchBooks({ query: input, startIndex: 0 }) as any);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto px-4 py-4">
//       <input
//         type="text"
//         placeholder="Найти книгу по названию или автору"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
//       />
//     </form>
//   );
// }

// export default SearchBar;
