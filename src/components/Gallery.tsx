import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from './BookCard';
import Modal from './Modal';
import { fetchBooks } from '../slices/booksSlice';
import type { RootState } from '../store/store';
import type { Book } from '../slices/favoritesSlice';

function Gallery() {
  const dispatch = useDispatch();
  const { items: books, loading, hasMore, query, startIndex } = useSelector(
    (state: RootState) => state.books
  );
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Первоначальная загрузка
    if (books.length === 0) {
      dispatch(fetchBooks({ query, startIndex: 0 }) as any);
    }
  }, [dispatch, books.length, query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          dispatch(fetchBooks({ query, startIndex }) as any);
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [dispatch, startIndex, hasMore, loading, query]);

  return (
    <div className="px-4 py-6 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-center">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={setSelectedBook} />
      ))}

      <div ref={observerRef} className="h-4 col-span-full" />

      {loading && <p className="col-span-full text-center">Загрузка...</p>}

      {selectedBook && (
        <Modal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default Gallery;
