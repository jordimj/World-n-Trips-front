import { capitalize, Stack, Typography } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RoomIcon from '@mui/icons-material/Room';
import useInserterContext from '../../hooks/useInserterContext';
import { KindOfData } from '../../types';

const DATA_KINDS = {
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
        {Object.keys(DATA_KINDS).map((kind) => (
          <Stack
            key={kind}
            role="button"
            justifyContent="center"
            alignItems="center"
            onClick={() => setDatakind(kind as KindOfData)}
            sx={{
              backgroundColor: 'white',
              minWidth: '150px',
              p: 2,
              border: 'var(--border)',
              borderRadius: 'var(--border-radius)',
              '&:hover': {
                backgroundColor: 'var(--border)',
              },
            }}
          >
            <Typography fontSize="120px">
              {DATA_KINDS[kind as keyof typeof DATA_KINDS]}
            </Typography>
            <Typography>{capitalize(kind)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Step1;
