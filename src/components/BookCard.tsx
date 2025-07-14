import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, updateFavoritesInFirestore } from '../slices/favoritesSlice';
import type {  Book } from '../slices/favoritesSlice';
import type { RootState } from '../store/store';
import { Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

function BookCard({ book, onClick }: BookCardProps) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.some((fav) => fav.id === book.id);

  const handleToggleFavorite = () => {
    if (!user) {
      alert('Чтобы добавить в избранное, войдите через Google');
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(book.id));
    } else {
      dispatch(addFavorite(book));
    }

    updateFavoritesInFirestore();
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden w-[150px] hover:scale-105 transition-transform"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div onClick={() => onClick(book)} className="cursor-pointer">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-[220px] object-cover"
        />
        <div className="p-2">
          <h3 className="text-sm font-bold line-clamp-2">{book.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
            {book.authors.join(', ')}
          </p>
        </div>
      </div>

      {(hovered || isFavorite) && (
        <button
          onClick={handleToggleFavorite}
          className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow hover:scale-110 transition-transform"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-red-500'}
          />
        </button>
      )}
    </div>
  );
}

export default BookCard;
