import { Fragment, useState } from 'react';
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

function EphemerisDialog(props) {
  const { onClose, open, ephemeris } = props;

  const [showTimeAgo, setShowTimeAgo] = useState(true);
  const toggleShowTimeAgo = () => setShowTimeAgo((prev) => !prev);

  const navigate = useNavigate();
  const onCountryFlagClick = (countryName) => {
    onClose();
    navigate(`/country/${countryName}/`);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ alignItems: 'center' }}>
        Travel ephemeris of the day
        <IconButton aria-label="close-ephemeris-dialog" onClick={onClose} sx={{ ml: 2 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        {ephemeris.map((eph, idx) => (
          <ListItem key={idx}>
            {eph.country ? (
              <Fragment>
                <img
                  src={`/img/flags/${eph.country.alpha3code}.png`}
                  alt={`${eph.country.name}'s flag`}
                  width="75"
                  onClick={() => onCountryFlagClick(eph.country.alpha3code)}
                  style={{
                    cursor: 'pointer',
                  }}
                />
                <Stack sx={{ ml: 2 }}>
                  <Typography sx={{ mb: 1 }} onClick={toggleShowTimeAgo}>
                    {showTimeAgo ? getYearsAgo(eph.date) : formatFullDate(eph.date)}
                  </Typography>
                  <Typography>
                    I slept at {eph.city}, {eph.country.name}
                  </Typography>
                  <Typography>In the {buildTripName(eph.trip)}</Typography>
                </Stack>
              </Fragment>
            ) : (
              <Stack sx={{ ml: 2 }}>
                <Typography sx={{ mb: 1 }} onClick={toggleShowTimeAgo}>
                  {showTimeAgo ? getYearsAgo(eph.date) : formatFullDate(eph.date)}
                </Typography>
                <Typography>
                  I was coming back from my {buildTripName(eph.trip)}
                </Typography>
              </Stack>
            )}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default EphemerisDialog;
