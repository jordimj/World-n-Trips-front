import { Fragment, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchDialog from '../SearchDialog';
import useKeyDown from '@/hooks/useKeyDown';

function Search() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useKeyDown('S', handleOpen, true);

  return (
    <Fragment>
      <SearchIcon onClick={handleOpen} sx={{ color: 'white' }} />
      {open && <SearchDialog open onClose={handleClose} />}
    </Fragment>
  );
}

export default Search;
