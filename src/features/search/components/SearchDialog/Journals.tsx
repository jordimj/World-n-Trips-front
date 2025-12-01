import { CircularProgress, Stack, Typography } from '@mui/material';
import { formatDate } from '@/utils/date';
import { Journal } from '../../hooks/useSearch';

interface Props {
  journals?: Array<Journal>;
  shouldShow: boolean;
  isFetching: boolean;
}

export default function Journals(props: Props) {
  const { journals, shouldShow, isFetching } = props;

  if (!shouldShow) return null;

  const hasJournals = journals && journals.length > 0;

  return (
    <Stack
      gap={1}
      sx={{
        backgroundColor: 'white',
        p: 2,
        borderTop: 'var(--border)',
        borderBottomLeftRadius: 'var(--border-radius)',
        borderBottomRightRadius: 'var(--border-radius)',
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: 500, textAlign: 'center' }}>Journals</Typography>
      {isFetching && <CircularProgress />}
      {hasJournals ? (
        <Stack gap={1} sx={{ p: 1 }}>
          {journals.slice(0, 5).map((journal) => (
            <Stack
              key={journal.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Typography>{journal.title}</Typography>
              <Typography
                sx={{ fontSize: 12, fontWeight: 500, color: 'var(--text-color-secondary)' }}
              >
                {formatDate(journal.date)}
              </Typography>
            </Stack>
          ))}
          {journals.length > 5 && (
            <Typography sx={{ color: 'var(--text-color-secondary)', fontSize: 12, ml: 'auto' }}>
              + {journals.length - 5} journal entries
            </Typography>
          )}
        </Stack>
      ) : (
        <Typography sx={{ fontSize: 14, color: 'var(--text-color-secondary)', pt: 2 }}>
          No journals found.
        </Typography>
      )}
    </Stack>
  );
}
