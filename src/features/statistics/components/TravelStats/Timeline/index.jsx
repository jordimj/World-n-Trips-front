import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import * as actions from '../../../../journals/actions/actions';
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

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Fragment>
      <Typography variant="h2">Travel Timeline</Typography>
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between" sx={{ mx: 5 }}>
          {months.map((month) => (
            <Typography key={month}>{month}</Typography>
          ))}
        </Stack>
        <Stack direction="row" gap={1}>
          <Stack justifyContent="space-between" sx={{ height: 'auto', my: '4px' }}>
            {days.map((day) => (
              <Typography>{day}</Typography>
            ))}
          </Stack>
          <Box className={styles.grid} sx={{ gridColumnStart: firstDay.day() + 1 }}>
            {Array.from({ length: daysInYear }).map((item, idx) => (
              <Day
                key={idx}
                day={firstDay.add(idx, 'day')}
                daysInYear={daysInYear}
                trip={filteredTrips.find(
                  (trip) =>
                    firstDay
                      .add(idx, 'day')
                      .isBetween(trip.arrivalDate.date, trip.departureDate.date) ||
                    firstDay.add(idx, 'day').isSame(trip.arrivalDate.date) ||
                    firstDay.add(idx, 'day').isSame(trip.departureDate.date)
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
