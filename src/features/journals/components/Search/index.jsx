import { Fragment } from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './Search.module.css';

function Search({
  search,
  keywordRef,
  handleNextOccurrence,
  handleLastOccurrence,
  handleSearch,
  handleStopSearch,
}) {
  const { isSearching, totalMatches, current } = search;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isSearching) {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Stack className={styles.root}>
      <Stack direction="row" sx={{ mx: 1 }}>
        <InputBase
          placeholder="Search by keyword"
          inputProps={{ 'aria-label': 'search by keyword' }}
          inputRef={keywordRef}
          onKeyDown={handleKeyDown}
          sx={{ ml: 1 }}
        />
        {isSearching ? (
          <IconButton onClick={handleStopSearch} aria-label="close search">
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSearch} aria-label="search">
            <SearchIcon />
          </IconButton>
        )}
      </Stack>
      {isSearching &&
        (totalMatches > 0 ? (
          <Fragment>
            <Typography>{totalMatches} occurrences found!</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography sx={{ pr: 1 }}>
                {current + 1} / {totalMatches}
              </Typography>
              <IconButton
                onClick={handleLastOccurrence}
                aria-label="last occurrence"
                disabled={current === null || current === 0}
              >
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton
                onClick={handleNextOccurrence}
                aria-label="next occurrence"
                disabled={current === totalMatches - 1}
              >
                <ArrowDownwardIcon />
              </IconButton>
            </Stack>
          </Fragment>
        ) : (
          <Typography>No occurrences found.</Typography>
        ))}
    </Stack>
  );
}

export default Search;
