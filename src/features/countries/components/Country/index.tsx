import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FlagIcon from '@mui/icons-material/Flag';
import { Button, Stack, Typography } from '@mui/material';
import useCountry from '@/features/countries/hooks/useCountry';
import useSetCountryVisited from '@/features/countries/hooks/useUpdateCountryVisited';
import CountryHeader from './CountryHeader';
import ExpensesStatistics from './Statistics/Expenses/Expenses';
import HitchhikesStatistics from './Statistics/Hitchhikes/Hitchhikes';
import NightsStatistics from './Statistics/Nights/Nights';
import VisitedSpots from './VisitedSpots';

function Country() {
  const { data: country, isFetching } = useCountry();
  const { mutate: setVisited, isPending: isPendingVisited } = useSetCountryVisited();
  const [, setSearchParams] = useSearchParams();

  const hasData =
    country?.citiesVisited.length !== 0 ||
    country?.nights !== undefined ||  
    country?.hitchhikes !== undefined ||
    country?.expenses !== undefined;

    console.log({hasData , citiesVisited: country?.citiesVisited, nights: country?.nights, hitchhikes: country?.hitchhikes, expenses: country?.expenses})

  return (
    <Fragment>
      <CountryHeader
        info={country?.info}
        statesVisited={country?.statesVisited}
        trips={country?.trips}
        isLoading={isFetching}
      />
      {hasData ? (
        <Fragment>
          {country?.citiesVisited?.length !== 0 && (
            <VisitedSpots
              cities={country?.citiesVisited ?? []}
              states={country?.statesVisited ?? []}
            />
          )}
          {country?.nights && (
            <NightsStatistics kmWalked={country?.kilometersWalked} nights={country?.nights} />
          )}
          {country?.hitchhikes && (
            <HitchhikesStatistics
              hitchhikes={country.hitchhikes}
              totalNights={country.nights?.count.total}
            />
          )}
          {country?.expenses && (
            <ExpensesStatistics
              expenses={country.expenses}
              totalNights={country.nights?.count.total}
            />
          )}
        </Fragment>
      ) : country?.info.visited ? (
        <Stack gap={3} sx={{ alignItems: 'center', mt: 5 }}>
          <Typography sx={{ fontSize: 'var(--spacing-5)' }}>
            You have not uploaded data yet for this country.
          </Typography>
          <Stack direction="row" gap={2}>
            <Button
              variant="contained"
              startIcon={<FileUploadIcon />}
              sx={{ fontWeight: 400, textTransform: 'none' }}
              onClick={() => setSearchParams({ dialog: 'inserter' })}
            >
              Add travel data
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FlagIcon />}
              sx={{ fontWeight: 400, textTransform: 'none' }}
              disabled={isPendingVisited}
              onClick={() => setVisited(false)}
            >
              Mark it as unvisited
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack gap={3} sx={{ alignItems: 'center', mt: 5 }}>
          <Typography sx={{ fontSize: 'var(--spacing-5)' }}>
            Have you already been to this country?
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FlagIcon />}
            sx={{ fontWeight: 400, textTransform: 'none' }}
            disabled={isPendingVisited}
            onClick={() => setVisited(true)}
          >
            Mark it as visited!
          </Button>
        </Stack>
      )}
    </Fragment>
  );
}
export default Country;
