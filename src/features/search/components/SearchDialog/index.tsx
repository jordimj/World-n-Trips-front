import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, ClickAwayListener, debounce, IconButton, Stack } from '@mui/material';
import Countries from '@/features/search/components/SearchDialog/Countries';
import Expenses from '@/features/search/components/SearchDialog/Expenses';
import Journals from '@/features/search/components/SearchDialog/Journals';
import useKeyDown from '@/hooks/useKeyDown';
import SearchInput from '@/template/components/SearchInput';
import useSearch from '../../hooks/useSearch';
import styles from './SearchDialog.module.css';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function SearchDialog(props: SearchDialogProps) {
  const { open, onClose } = props;

  const [keyword, setKeyword] = useState('');
  useKeyDown('Escape', onClose);

  const onChangeKeyword = debounce((e: any) => {
    e.preventDefault();
    setKeyword(e.target.value);
  }, 300);

  const { data, isFetching } = useSearch(keyword);

  const shouldShow = keyword.length > 0;

  return (
    <Backdrop open={open}>
      <ClickAwayListener onClickAway={onClose}>
        <Box className={[styles.dialog, shouldShow && styles.open].join(' ')}>
          <SearchInput placeholder="Search anything" onChange={onChangeKeyword} autoFocus />
          <IconButton
            aria-label="close-search"
            onClick={onClose}
            sx={{
              ml: 'auto',
              position: 'absolute',
              top: 'var(--spacing-2)',
              right: 'var(--spacing-2)',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Stack direction="row">
            <Countries keyword={keyword} onClose={onClose} />
            <Expenses keyword={keyword} onClose={onClose} expenses={data?.expenses} />
          </Stack>
          <Journals journals={data?.journals} shouldShow={shouldShow} isFetching={isFetching} />
        </Box>
      </ClickAwayListener>
    </Backdrop>
  );
}

export default SearchDialog;
