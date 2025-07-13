import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Отслеживание прокрутки
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      title="Наверх"
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTopButton;





// import { useEffect, useState } from 'react';
// import { ArrowUp } from 'lucide-react';

// function ScrollToTopButton() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setVisible(window.scrollY > 300);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (!visible) return null;

//   return (
//     <button
//       onClick={scrollToTop}
//       className="fixed bottom-6 right-6 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition z-50"
//       aria-label="Вернуться наверх"
//     >
//       <ArrowUp size={20} />
//     </button>
//   );
// }

// export default ScrollToTopButton;
