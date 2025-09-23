import { useEffect, useRef, useState } from 'react';

const initialState = {
  isSearching: false,
  occurrences: [],
  current: null,
  totalMatches: 0,
};

const useJournalSearch = () => {
  const [search, setSearch] = useState(initialState);
  const keywordRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.occurrence');
    setSearch({ ...search, occurrences: elements, totalMatches: elements.length });
  }, [search.isSearching]);

  useEffect(() => {
    if (search.current === null) return;
    search.occurrences[search.current].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [search.current]);

  const handleSearch = () => {
    if (keywordRef.current.value === '') return;

    setSearch({
      ...initialState,
      isSearching: true,
    });
  };

  const handleStopSearch = () => {
    setSearch(initialState);
    keywordRef.current.value = '';
  };

  const handleNextOccurrence = () =>
    setSearch((prevSearch) => ({
      ...prevSearch,
      current: search.current !== null ? search.current + 1 : 0,
    }));

  const handleLastOccurrence = () =>
    setSearch((prevSearch) => ({ ...prevSearch, current: prevSearch.current - 1 }));

  return {
    search,
    keywordRef,
    handleSearch,
    handleStopSearch,
    handleNextOccurrence,
    handleLastOccurrence,
  };
};

export default useJournalSearch;
