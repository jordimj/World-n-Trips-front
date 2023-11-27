import { Fragment, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Badge, IconButton, Popover } from '@mui/material';
import Spinner from '@/template/components/Spinner/Spinner';
import useFetchEphemerides from '../../hooks/useFetchEphemerides';
import EphemeridesList from '../EphemeridesList';

function Ephemerides() {
  const { data, isFetching } = useFetchEphemerides();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'ephemerides-popover' : undefined;

  if (!data) return null;

  const { ephemerides, ephemeridesCount } = data;

  return (
    <Fragment>
      {isFetching ? (
        <Spinner />
      ) : (
        <IconButton
          color="secondary"
          title="Travel ephemerides of the day"
          aria-label="open popover with travel ephemerides"
          onClick={handleOpen}
        >
          <Badge color="secondary" badgeContent={ephemeridesCount}>
            <CalendarMonthIcon />
          </Badge>
        </IconButton>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <EphemeridesList ephemerides={ephemerides} onClose={handleClose} />
      </Popover>
    </Fragment>
  );
}

export default Ephemerides;
