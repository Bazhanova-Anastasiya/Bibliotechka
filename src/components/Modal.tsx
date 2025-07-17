import type { Book } from '../slices/favoritesSlice';
import { X } from 'lucide-react';

interface ModalProps {
  book: Book;
  onClose: () => void;
}

function Modal({ book, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full relative max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-white hover:text-red-500"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-[150px] h-auto object-cover rounded"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Автор(ы): {book.authors.join(', ')}
            </p>
            <p className="text-sm">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
