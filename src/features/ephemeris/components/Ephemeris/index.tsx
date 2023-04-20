import { Fragment, useState } from 'react';
import Badge from '@mui/material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Spinner from '@/template/components/Spinner/Spinner';
import EphemerisDialog from '../EphemerisDialog';
import useFetchEphemeris from '../../hooks/useFetchEphemeris';

function Ephemeris() {
  const { data, isFetching } = useFetchEphemeris();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!data) return null;

  const { allEphemeris, ephemerisCount } = data;

  return (
    <Fragment>
      {isFetching ? (
        <Spinner />
      ) : (
        <Badge
          color="error"
          badgeContent={ephemerisCount}
          sx={{ ml: 'auto', color: 'white' }}
        >
          <CalendarMonthIcon onClick={handleOpen} />
        </Badge>
      )}
      <EphemerisDialog open={open} allEphemeris={allEphemeris} onClose={handleClose} />
    </Fragment>
  );
}

export default Ephemeris;
