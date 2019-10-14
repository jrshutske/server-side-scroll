import { useEffect } from 'react';

export default function useInfiniteScroll(searchGiphy, searchTerm, doc) {

  useEffect(() => {
    doc.addEventListener('scroll', trackScrolling);
    return () => {
      doc.removeEventListener('scroll', trackScrolling);
    }
  })

  const trackScrolling = async () => {
    const divElement = doc.getElementById('screen');
    if (divElement.getBoundingClientRect().bottom <= window.innerHeight) {
      searchGiphy(searchTerm)
      doc.removeEventListener('scroll', trackScrolling);
    }
  };
}

