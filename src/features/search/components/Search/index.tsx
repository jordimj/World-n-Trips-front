import { Fragment, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import useKeyDown from '@/hooks/useKeyDown';
import SearchDialog from '../SearchDialog';

function Search() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useKeyDown('S', handleOpen, true);

  return (
    <Fragment>
      <IconButton aria-label="open search dialog" color="secondary" onClick={handleOpen}>
        <SearchIcon />
      </IconButton>
      {open && <SearchDialog open onClose={handleClose} />}
    </Fragment>
  );
}

export default Search;
