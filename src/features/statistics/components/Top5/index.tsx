import { Box, Stack } from '@mui/material';
import { Top5Stats } from '@/features/statistics/types';
import Divider from '@/template/components/Divider';
import Ranking from './Ranking';

interface Props {
  top5: Top5Stats;
}

export default function Top5(props: Props) {
  const { top5 } = props;

  return (
    <Stack gap={3}>
      <Divider sx={{ alignSelf: 'center' }}>Top 5</Divider>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={3}>
        <Ranking stats={top5.longestInCountry} title="Longest stays" />
        <Ranking stats={top5.longestInCities} title="Longest stays" />
        {top5.hitchhiked.length !== 0 && (
          <Ranking stats={top5.hitchhiked} title="Hitchhiked the most" format="kilometers" />
        )}
        <Ranking stats={top5.mostSpent} title="Highest spending" format="currency" />
        {top5.mostExpensiveVisas.length !== 0 && (
          <Ranking stats={top5.mostExpensiveVisas} title="Most expensive visas" format="currency" />
        )}
      </Box>
    </Stack>
  );
}
