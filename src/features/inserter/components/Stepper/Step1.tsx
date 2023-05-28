import { capitalize, Stack, Typography } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RoomIcon from '@mui/icons-material/Room';
import { KindOfData } from '../../types';
import { useInserterContext } from '../../hooks/useInserterContext';

const DATA_KINDS = {
  day: <LightModeIcon fontSize="inherit" />,
  night: <NightShelterIcon fontSize="inherit" />,
  spot: <RoomIcon fontSize="inherit" />,
  expense: <EuroIcon fontSize="inherit" />,
  journal: <EditNoteIcon fontSize="inherit" />,
};

interface Props {
  goToStep2: () => void;
}

function Step1(props: Props) {
  const { goToStep2 } = props;
  const {
    actions: { setDatakind },
  } = useInserterContext();

  const onDataKindClick = (kind: KindOfData) => {
    setDatakind(kind);
    goToStep2();
  };

  return (
    <Stack alignItems="center" gap={2}>
      <Typography variant="h2">Select the kind of data to be imported</Typography>
      <Stack direction="row" gap={3}>
        {Object.keys(DATA_KINDS).map((kind) => (
          <Stack
            role="button"
            justifyContent="center"
            alignItems="center"
            onClick={() => onDataKindClick(kind as KindOfData)}
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
