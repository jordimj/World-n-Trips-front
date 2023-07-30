import { Box, Stack, Typography } from '@mui/material';
import TravelStatsTable from '../TravelStatsTable';

function Top5({ top5 }) {
  return (
    <Stack>
      <Typography variant="h2">TOP 5</Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(400px, 1fr))"
        gap={3}
        sx={{ mx: 2 }}
      >
        <TravelStatsTable
          stats={top5.longestInCountry}
          kind="country"
          title="Countries where I stayed the longest"
          shortTable
        />
        <TravelStatsTable
          stats={top5.longestInCities}
          kind="city"
          title="Cities where I stayed the longest"
          shortTable
        />
        {top5.hitchhiked.length !== 0 && (
          <TravelStatsTable
            stats={top5.hitchhiked}
            kind="country"
            title="Countries where I hitchhiked the most"
            format="kilometers"
            shortTable
          />
        )}
        <TravelStatsTable
          stats={top5.mostSpent}
          kind="country"
          title="Countries where I spent the most"
          format="currency"
          shortTable
        />
        {top5.mostExpensiveVisas.length !== 0 && (
          <TravelStatsTable
            stats={top5.mostExpensiveVisas}
            kind="country"
            title="Most expensive country visas"
            format="currency"
            shortTable
          />
        )}
      </Box>
    </Stack>
  );
}

export default Top5;
