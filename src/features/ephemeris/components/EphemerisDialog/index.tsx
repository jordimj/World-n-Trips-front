import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatFullDate, getYearsAgo } from '../../../../utils/date';
import { buildTripName } from '../../../../utils';
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

  const navigate = useNavigate();
  const onCountryFlagClick = (countryCode: string) => {
    onClose();
    navigate(`/countries/${countryCode}/`);
  };

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
                  <img
                    src={`/img/flags/${ephemeris.country.alpha3code}.png`}
                    alt={`${ephemeris.country.name}'s flag`}
                    onClick={() => onCountryFlagClick(ephemeris.country.alpha3code)}
                    width="75"
                    style={{
                      cursor: 'pointer',
                    }}
                  />
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
