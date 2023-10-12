import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import CountryFlag from '@/template/components/CountryFlag';
import { formatFullDate, getYearsAgo } from '@/utils/date';
import { buildTripName } from '@/utils';
import { Ephemerides } from '../../interfaces';

interface EphemeridesListProps {
  onClose: () => void;
  ephemerides: Ephemerides;
}

function EphemeridesList(props: EphemeridesListProps) {
  const { onClose, ephemerides } = props;

  const [showTimeAgo, setShowTimeAgo] = useState(true);
  const toggleShowTimeAgo = () => setShowTimeAgo((prev) => !prev);

  return (
    <Stack gap={2} sx={{ m: 2, mb: 1 }}>
      <Typography sx={{ fontSize: 20 }}>Travel ephemerides of the day</Typography>
      <List sx={{ p: 0, marginTrim: 'inline-end' }}>
        {ephemerides.map((ephemeris, idx) => (
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
    </Stack>
  );
}

export default EphemeridesList;
