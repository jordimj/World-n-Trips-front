import { Fragment } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import useTrips from '@/features/journals/hooks/useTrips';
import { MONTHS, WEEK_DAYS } from '../../constants';
import Day from './Day';
import styles from './Timeline.module.css';

export default function Timeline({ year }) {
  const { data: trips = [] } = useTrips();
  const firstDay = dayjs(year).startOf('year');

  const filteredTrips = trips.filter(
    (trip) =>
      dayjs(trip.arrivalDate).year() === firstDay.year() ||
      dayjs(trip.departureDate).year() === firstDay.year()
  );

  const daysInYear = firstDay.endOf('year').dayOfYear();

  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between" sx={{ mx: 'var(--spacing-9)' }}>
        {MONTHS.map((month) => (
          <Typography key={month}>{month}</Typography>
        ))}
      </Stack>
      <Stack direction="row" gap={1}>
        <Stack alignItems="center" justifyContent="space-between" sx={{ my: '2px' }}>
          {WEEK_DAYS.map((day, idx) => (
            <Typography key={idx}>{day}</Typography>
          ))}
        </Stack>
        <Box className={styles.grid} sx={{ gridColumnStart: firstDay.day() + 1 }}>
          {Array.from({ length: daysInYear }).map((_, idx) => (
            <Day
              key={idx}
              day={firstDay.add(idx, 'day')}
              daysInYear={daysInYear}
              trip={filteredTrips.find(
                (trip) =>
                  firstDay
                    .add(idx, 'day')
                    .isBetween(trip.arrivalDate, trip.departureDate) ||
                  firstDay.add(idx, 'day').isSame(trip.arrivalDate, 'day') ||
                  firstDay.add(idx, 'day').isSame(trip.departureDate, 'day')
              )}
              {...(idx === 0 && {
                gridRowStart: firstDay.day() === 0 ? 7 : firstDay.day(),
              })}
            />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}
