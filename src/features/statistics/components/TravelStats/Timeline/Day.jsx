import { Fragment } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import styles from './Day.module.css';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs.extend(dayOfYear);

function Day({ day, trip, gridRowStart, daysInYear }) {
  const firstWeek = Array.from({ length: 7 }).map((i, idx) => idx + 1);
  const lastWeek = Array.from({ length: 7 }).map((i, idx) => daysInYear - idx);

  return (
    <Tooltip
      title={
        <Fragment>
          <Typography>{day.format('dddd, MMMM D, YYYY')}</Typography>
          <Typography>{trip?.name}</Typography>
        </Fragment>
      }
      arrow
    >
      <Box
        className={[styles.day, trip === undefined && styles.empty]}
        sx={{
          backgroundColor: trip !== undefined ? 'red!important' : '',
          ...(gridRowStart !== undefined && { gridRowStart }),
          ...((day.dayOfYear() === 1 || day.day() === 1) && {
            borderTop: '3px dashed black !important',
          }),
          ...((day.dayOfYear() === daysInYear || day.day() === 0) && {
            borderBottom: '3px dashed black !important',
          }),
          ...(firstWeek.includes(day.dayOfYear()) && {
            borderLeft: '3px dashed black !important',
          }),
          ...(lastWeek.includes(day.dayOfYear()) && {
            borderRight: '3px dashed black !important',
          }),
        }}
      ></Box>
    </Tooltip>
  );
}

export default Day;
