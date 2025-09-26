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
      <Stack direction="row" gap={3} flexWrap="wrap">
        {(Object.keys(DATA_KINDS) as (keyof typeof DATA_KINDS)[]).map((kind) => (
          <Stack
            key={kind}
            role="button"
            justifyContent="center"
            alignItems="center"
            onClick={() => setDatakind(kind)}
            sx={{
              backgroundColor: 'white',
              minWidth: '150px',
              p: 2,
              border: 'var(--border)',
              borderRadius: 'var(--border-radius)',
              '&:hover': {
                backgroundColor: 'var(--border)',
                borderColor: 'var(--secondary-color)',
              },
            }}
          >
            <Typography fontSize="120px">{DATA_KINDS[kind]}</Typography>
            <Typography>{capitalize(kind)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Step1;
