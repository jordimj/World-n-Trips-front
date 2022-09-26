import { useState } from 'react';
import { useSelector } from 'react-redux';

const useJournalSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [totalMatches, setTotalMatches] = useState(0);

  const journals = useSelector((state) => state.journals);

  const handleSearch = () => {
    if (keyword === '') return;

    setIsSearching(true);
    setTotalMatches(
      journals.reduce(
        (acc, curr) => acc + (curr.text.match(new RegExp(keyword, 'gi')) ?? []).length,
        0
      )
    );
  };

  const handleStopSearch = () => {
    setIsSearching(false);
    setKeyword('');
    setTotalMatches(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return {
    keyword,
    setKeyword,
    isSearching,
    totalMatches,
    handleSearch,
    handleStopSearch,
    handleKeyDown,
    journals,
  };
};

export default useJournalSearch;
