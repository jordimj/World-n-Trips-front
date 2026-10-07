import { useEffect, useRef, useState } from 'react';

export interface SearchState {
  isSearching: boolean;
  occurrences: Array<HTMLElement>;
  current: number | null;
  totalMatches: number;
}

const initialState: SearchState = {
  isSearching: false,
  occurrences: [],
  current: null,
  totalMatches: 0,
};

const useJournalSearch = () => {
  const [search, setSearch] = useState<SearchState>(initialState);
  const keywordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.occurrence');
    setSearch({
      ...search,
      occurrences: Array.from(elements),
      totalMatches: elements.length,
    });
  }, [search.isSearching]);

  useEffect(() => {
    if (search.current === null) return;
    search.occurrences[search.current].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [search.current]);

  const handleSearch = () => {
    if (keywordRef.current?.value === '') return;

    setSearch({
      ...initialState,
      isSearching: true,
    });
  };

  const handleStopSearch = () => {
    setSearch(initialState);
    if (keywordRef.current === null) return;
    keywordRef.current.value = '';
  };

  const handleNextOccurrence = () =>
    setSearch((prevSearch) => ({
      ...prevSearch,
      current: search.current !== null ? search.current + 1 : 0,
    }));

  const handleLastOccurrence = () =>
    setSearch((prevSearch) => ({
      ...prevSearch,
      current: prevSearch.current !== null ? prevSearch.current - 1 : 0,
    }));

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
