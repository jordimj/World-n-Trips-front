import { Fragment, useState } from 'react';
import Badge from '@mui/material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EphemerisDialog from './EphemerisDialog';
import Spinner from '../UI/Spinner/Spinner';
import useFetchEphemeris from '../../hooks/useFetchEphemeris';

function Ephemeris() {
  const { data, isFetching } = useFetchEphemeris();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!data) return null;

  const { ephemeris, ephemerisCount } = data;

  return (
    <Fragment>
      {isFetching ? (
        <Spinner />
      ) : (
        <Badge
          color="error"
          badgeContent={ephemerisCount}
          sx={{ ml: 'auto', mr: 3, color: 'white' }}
        >
          <CalendarMonthIcon onClick={handleOpen} />
        </Badge>
      )}
      <EphemerisDialog open={open} ephemeris={ephemeris} onClose={handleClose} />
    </Fragment>
  );
}

export default Ephemeris;
