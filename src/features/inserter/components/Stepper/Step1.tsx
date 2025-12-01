import {
  NightShelter as NightShelterIcon,
  LightMode as LightModeIcon,
  Euro as EuroIcon,
  Room as RoomIcon,
  EditNote as EditNoteIcon,
  LocalAirport as LocalAirportIcon,
} from '@mui/icons-material';
import { capitalize, Stack, Typography } from '@mui/material';
import useInserterContext from '../../hooks/useInserterContext';

const DATA_KINDS = {
  trip: <LocalAirportIcon fontSize="inherit" />,
  day: <LightModeIcon fontSize="inherit" />,
  night: <NightShelterIcon fontSize="inherit" />,
  spot: <RoomIcon fontSize="inherit" />,
  expense: <EuroIcon fontSize="inherit" />,
  journal: <EditNoteIcon fontSize="inherit" />,
};

function Step1() {
  const {
    actions: { setDatakind },
  } = useInserterContext();

  return (
    <Stack alignItems="center" gap={2}>
      <Typography variant="h2">Select the kind of data to be imported</Typography>
      <Stack
        direction="row"
        gap={3}
        flexWrap="wrap"
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {(Object.keys(DATA_KINDS) as (keyof typeof DATA_KINDS)[]).map((kind) => (
          <Stack
            key={kind}
            role="button"
            justifyContent="center"
            alignItems="center"
            gap={3}
            onClick={() => setDatakind(kind)}
            sx={{
              backgroundColor: 'white',
              py: 3,
              px: 5,
              border: 'var(--border)',
              borderRadius: 'var(--border-radius)',
              '&:hover': {
                backgroundColor: 'var(--border)',
                borderColor: 'var(--secondary-color)',
              },
              '& svg': {
                fontSize: 'var(--spacing-11)',
              },
            }}
          >
            {DATA_KINDS[kind]}
            <Typography fontSize="var(--spacing-6)">{capitalize(kind)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Step1;
