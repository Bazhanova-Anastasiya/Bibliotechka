import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import BookCard from '../components/BookCard';
import Modal from '../components/Modal';
import { useState } from 'react';
import type { Book } from '../slices/favoritesSlice';

function FavoritesPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (!user) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-gray-700 dark:text-white">
        Войдите через Google, чтобы просматривать избранные книги.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Избранное</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">У вас пока нет избранных книг.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} onClick={setSelectedBook} />
          ))}
        </div>
      )}

      {selectedBook && (
        <Modal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default FavoritesPage;
