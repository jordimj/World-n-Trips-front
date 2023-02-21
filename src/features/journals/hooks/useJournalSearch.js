import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const useJournalSearch = () => {
  const keywordRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [totalMatches, setTotalMatches] = useState(0);

  const journals = useSelector((state) => state.journals.journals);

  const handleSearch = () => {
    if (keywordRef.current.value === '') return;

    setIsSearching(true);
    setTotalMatches(
      journals.reduce(
        (acc, curr) =>
          acc +
          (curr.text.match(new RegExp(keywordRef.current.value, 'gi')) ?? []).length,
        0
      )
    );
  };

  const handleStopSearch = () => {
    setIsSearching(false);
    setTotalMatches(0);
    keywordRef.current.value = '';
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return {
    keywordRef,
    isSearching,
    totalMatches,
    handleSearch,
    handleStopSearch,
    handleKeyDown,
    journals,
  };
};

export default useJournalSearch;
