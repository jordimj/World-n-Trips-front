import { Fragment } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HitchhikesChart from './HitchikesChart';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import { DATA_APPENDICES } from '../../../../../../constants';
import { numberFormatter } from '../../../../../../utils/number';
import KPI from '../KPI/KPI';

export default function HitchhikesStatistics({ hitchhikes, totalNights }) {
  const {
    totalKilometers,
    totalKilometersOpenAir,
    daysOnTheRoad,
    totalCars,
    distances,
    minutesWaiting,
    statsPerHour,
  } = hitchhikes;

  return (
    <Fragment>
      <Stack component="section" gap={5} alignItems="center">
        <Divider>Hitchhikes</Divider>
        <Stack direction="row" gap={3}>
          <KPI
            icon={<ThumbUpIcon fontSize="inherit" />}
            label="Kilometers hitchhiked"
            KPI={numberFormatter(totalKilometers)}
          />
          <KPI
            icon={<CalendarMonthIcon fontSize="inherit" />}
            label="Days on the road"
            KPI={numberFormatter(daysOnTheRoad)}
          />
          {minutesWaiting && (
            <KPI
              icon={<AccessTimeIcon fontSize="inherit" />}
              label="Minutes waiting"
              KPI={minutesWaiting.total}
            />
          )}
          <KPI
            icon={<DirectionsCarIcon fontSize="inherit" />}
            label="Cars hitchhiked"
            KPI={numberFormatter(Math.trunc(totalCars))}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Stack sx={{ width: '32%' }}>
            <DetailRow
              label="Average kilometers per day in the country"
              value={numberFormatter(
                totalKilometers / totalNights,
                DATA_APPENDICES.KM_PER_DAY
              )}
            />
            <DetailRow
              label="Average kilometers per day on the road"
              value={numberFormatter(totalKilometers / daysOnTheRoad, DATA_APPENDICES.KM)}
            />
            <DetailRow
              label="Average rides per day on the road"
              value={numberFormatter(totalCars / daysOnTheRoad, DATA_APPENDICES.RIDES)}
            />
          </Stack>
          <Stack sx={{ width: '32%' }}>
            <DetailRow
              label="Longest distance per ride"
              value={numberFormatter(distances.longest, DATA_APPENDICES.KM)}
            />
            <DetailRow
              label="Average distance per ride"
              value={numberFormatter(distances.average, DATA_APPENDICES.KM)}
            />
            <DetailRow
              label="Shortest distance per ride"
              value={numberFormatter(distances.shortest, DATA_APPENDICES.KM)}
            />
          </Stack>
          {minutesWaiting && (
            <Stack sx={{ width: '32%' }}>
              <DetailRow
                label="Longest wait per ride"
                value={numberFormatter(
                  minutesWaiting.waits.longest,
                  DATA_APPENDICES.MINS
                )}
              />
              <DetailRow
                label="Average wait per ride"
                value={numberFormatter(
                  minutesWaiting.waits.average,
                  DATA_APPENDICES.MINS
                )}
              />
              <DetailRow
                label="Shortest wait per ride"
                value={numberFormatter(
                  minutesWaiting.waits.shortest,
                  DATA_APPENDICES.MINS
                )}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
      {minutesWaiting && (
        <Box sx={{ mt: 4 }}>
          <HitchhikesChart stats={statsPerHour} chartKind="rides" />
          <HitchhikesChart stats={statsPerHour} chartKind="distance" />
          <HitchhikesChart stats={statsPerHour} chartKind="minutes" />
        </Box>
      )}
    </Fragment>
  );
}
