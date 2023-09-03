import { Fragment, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchDialog from '../SearchDialog';
import useKeyDown from '@/hooks/useKeyDown';
import { IconButton } from '@mui/material';

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
