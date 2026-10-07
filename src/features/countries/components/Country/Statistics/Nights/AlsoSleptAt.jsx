import { Fragment } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { getAdverbialNumber } from '@/utils/number';
import styles from './AlsoSleptAt.module.css';

function getEmoji(string) {
  const emojis = {
    Car: '🚗',
    Bus: '🚌',
    Train: '🚂',
    Truck: '🚚',
    Parking: '🅿️',
    Plane: '✈️',
    Ferry: '⛴️',
    Worktrip: '💼',
    Camping: '🏕️',
    Sofa: '🛋️',
    Mosque: '🕌',
    Temple: '🛕',
    'Temple room': '🛏️',
    'Train station': '🚉',
    'Rental car': '🚗',
    'Free hotel': '🏨',
    'Free hostel': '🛌',
    'Security room': '🔒',
    'Closed bar': '🍷',
    'Did not actually sleep, hiked the Mount Sinai instead': '⛰️',
  };

  return emojis[string] ?? '😊';
}

function AlsoSleptAt(props) {
  const { infoExtra } = props;

  if (Object.keys(infoExtra).length === 0) return <Fragment />;

  return (
    <Stack>
      <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 3 }}>
        Also slept:
      </Typography>
      <List className={styles.extraInfoList}>
        {Object.entries(infoExtra).map(([spot, nights]) => (
          <ListItem key={spot} disablePadding>
            <ListItemIcon className={styles.extraInfoIcon}>{getEmoji(spot)}</ListItemIcon>
            <ListItemText
              primary={`In a ${spot.toLowerCase()}`}
              secondary={getAdverbialNumber(nights)}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

export default AlsoSleptAt;
