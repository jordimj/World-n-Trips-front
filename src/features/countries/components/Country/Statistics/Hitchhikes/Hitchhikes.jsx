import { Box, Divider, Stack } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DATA_APPENDICES } from '@/constants';
import { numberFormatter } from '@/utils/number';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import KPI from '../KPI';
import HitchhikesCharts from './HitchhikesCharts';

export default function HitchhikesStatistics({ hitchhikes, totalNights }) {
  const {
    totalKilometers,
    daysOnTheRoad,
    totalCars,
    distances,
    minutesWaiting,
    statsPerHour,
  } = hitchhikes;

  return (
    <Box component="section" sx={{ mb: 3 }}>
      <Stack component="section" gap={5} alignItems="center">
        <Divider>Hitchhikes</Divider>
        <Stack direction="row" gap={3} flexWrap="wrap">
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
          gap={2}
          flexWrap="wrap"
          sx={{ width: '75%' }}
        >
          <Stack sx={{ flex: 3, minWidth: '500px' }}>
            <DetailRow
              label="Average kilometers per traveled day"
              value={numberFormatter(totalKilometers / totalNights, DATA_APPENDICES.KM)}
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
          <Stack sx={{ flex: 2, minWidth: '300px' }}>
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
            <Stack sx={{ flex: 2, minWidth: '300px' }}>
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
      {minutesWaiting && <HitchhikesCharts statsPerHour={statsPerHour} />}
    </Box>
  );
}
