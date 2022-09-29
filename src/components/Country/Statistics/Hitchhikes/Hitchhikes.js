import { Box, Divider, Stack } from '@mui/material';
import HitchhikesChart from './HitchikesChart';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import { DATA_APPENDICES } from '../../../../constants';
import { numberFormatter } from '../../../../utils/helpers';

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
    <Box component="section" sx={{ textAlign: '-webkit-center' }}>
      <Divider>Hitchhikes</Divider>
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <Stack sx={{ width: '40%' }}>
          <DetailRow
            label="Total of kilometers"
            value={numberFormatter(totalKilometers, DATA_APPENDICES.KM)}
          />
          {totalKilometersOpenAir && (
            <DetailRow
              label="Kilometers in the back of the pickup"
              value={numberFormatter(totalKilometersOpenAir, DATA_APPENDICES.KM)}
            />
          )}
          <DetailRow
            label="Days on the road"
            value={numberFormatter(daysOnTheRoad, DATA_APPENDICES.DAYS)}
          />
          {minutesWaiting && (
            <DetailRow
              label="Waiting on the road"
              value={numberFormatter(minutesWaiting.total, DATA_APPENDICES.MINS)}
            />
          )}
          <DetailRow
            label="Number of rides we got"
            value={numberFormatter(Math.trunc(totalCars), DATA_APPENDICES.RIDES)}
          />
        </Stack>
        <Stack sx={{ width: '40%' }}>
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
          {minutesWaiting && (
            <>
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
            </>
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
    </Box>
  );
}
