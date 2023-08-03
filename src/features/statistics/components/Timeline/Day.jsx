import { Box, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { buildTripName } from '@/utils';
import styles from './Day.module.css';

dayjs.extend(dayOfYear);

function Day({ day, trip, gridRowStart, daysInYear }) {
  const firstWeek = Array.from({ length: 7 }).map((i, idx) => idx + 1);
  const lastWeek = Array.from({ length: 7 }).map((i, idx) => daysInYear - idx);

  return (
    <Tooltip
      title={
        <Stack gap={1} sx={{ m: 1 }}>
          <Typography>{day.format('dddd, MMMM D, YYYY')}</Typography>
          {trip?.name && (
            <Typography fontWeight={700}>{buildTripName(trip?.name)}</Typography>
          )}
        </Stack>
      }
      arrow
    >
      <Box
        className={[styles.day, trip === undefined ? styles.empty : styles.visited]}
        sx={{
          ...(gridRowStart !== undefined && { gridRowStart }),
          ...((day.dayOfYear() === 1 || day.day() === 1 || day.date() === 1) && {
            borderTop: '2px dashed black !important',
          }),
          ...((day.dayOfYear() === daysInYear || day.day() === 0) && {
            borderBottom: '2px dashed black !important',
          }),
          ...((firstWeek.includes(day.dayOfYear()) || firstWeek.includes(day.date())) && {
            borderLeft: '2px dashed black !important',
          }),
          ...(lastWeek.includes(day.dayOfYear()) && {
            borderRight: '2px dashed black !important',
          }),
        }}
      ></Box>
    </Tooltip>
  );
}

export default Day;
