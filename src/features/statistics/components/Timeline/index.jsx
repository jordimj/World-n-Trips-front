import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import * as actions from '@/features/journals/actions/actions';
import { MONTHS, WEEK_DAYS } from '../../constants';
import Day from './Day';
import styles from './Timeline.module.css';

function Timeline({ year }) {
  const firstDay = dayjs(`1-1-${year}`);

  const trips = useSelector((state) => state.journals.trips);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trips.length === 0) dispatch(actions.fetchTrips());
  }, []);

  const filteredTrips = trips.filter(
    (trip) =>
      dayjs(trip.arrivalDate.date).year() === firstDay.year() ||
      dayjs(trip.departureDate.date).year() === firstDay.year()
  );

  const daysInYear = firstDay.endOf('year').dayOfYear();

  return (
    <Fragment>
      <Typography variant="h2">Travel Timeline</Typography>
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between" sx={{ mx: '100px' }}>
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
                      .isBetween(trip.arrivalDate.date, trip.departureDate.date) ||
                    firstDay.add(idx, 'day').isSame(trip.arrivalDate.date, 'day') ||
                    firstDay.add(idx, 'day').isSame(trip.departureDate.date, 'day')
                )}
                {...(idx === 0 && {
                  gridRowStart: firstDay.day() === 0 ? 7 : firstDay.day(),
                })}
              />
            ))}
          </Box>
        </Stack>
      </Stack>
    </Fragment>
  );
}

export default Timeline;
