import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CountryFlag from '@/template/components/CountryFlag';
import { formatFullDate, getYearsAgo } from '@/utils/date';
import { buildTripName } from '@/utils';
import { EphemerisList } from '../../interfaces';

interface EphemerisDialogProps {
  open: boolean;
  onClose: () => void;
  allEphemeris: EphemerisList;
}

function EphemerisDialog(props: EphemerisDialogProps) {
  const { open, onClose, allEphemeris } = props;

  const [showTimeAgo, setShowTimeAgo] = useState(true);
  const toggleShowTimeAgo = () => setShowTimeAgo((prev) => !prev);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        Travel ephemeris of the day
        <IconButton
          aria-label="close-ephemeris-dialog"
          onClick={onClose}
          sx={{ ml: 'auto' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <List sx={{ m: 2, mt: 0, p: 0 }}>
        {allEphemeris.map((ephemeris, idx) => (
          <ListItem key={idx} sx={{ p: 2 }}>
            <Stack sx={{ width: '100%' }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 700, ml: 'auto' }}
                onClick={toggleShowTimeAgo}
              >
                {showTimeAgo
                  ? getYearsAgo(ephemeris.date)
                  : formatFullDate(ephemeris.date)}
              </Typography>
              {ephemeris.country ? (
                <Stack direction="row" alignItems="center">
                  <NavLink
                    to={`/countries/${ephemeris.country.alpha3code}/`}
                    onClick={onClose}
                  >
                    <CountryFlag name={ephemeris.country.name} height={75} />
                  </NavLink>
                  <Stack sx={{ ml: 3 }}>
                    <Typography>
                      I slept in {ephemeris.city}, {ephemeris.country.name}
                    </Typography>
                    <Typography>During the {buildTripName(ephemeris.trip)}</Typography>
                  </Stack>
                </Stack>
              ) : (
                <Typography>I was in my {buildTripName(ephemeris.trip)}</Typography>
              )}
            </Stack>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default EphemerisDialog;
