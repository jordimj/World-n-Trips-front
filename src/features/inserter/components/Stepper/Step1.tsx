import EditNoteIcon from '@mui/icons-material/EditNote';
import EuroIcon from '@mui/icons-material/Euro';
import LightModeIcon from '@mui/icons-material/LightMode';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import RoomIcon from '@mui/icons-material/Room';
import { Button, ButtonBase, Stack, Typography } from '@mui/material';
import useInserterContext from '../../hooks/useInserterContext';

const MAIN_OPTIONS = [
  {
    kind: 'trip',
    label: 'Trip',
    description: 'Create a trip and import your itinerary',
    Icon: LocalAirportIcon,
  },
  {
    kind: 'journal',
    label: 'Journal',
    description: 'Write about a day of your trip',
    Icon: EditNoteIcon,
  },
] as const;

const INDIVIDUAL_OPTIONS = [
  { kind: 'day', label: 'Day', Icon: LightModeIcon },
  { kind: 'night', label: 'Night', Icon: NightShelterIcon },
  { kind: 'expense', label: 'Expense', Icon: EuroIcon },
  { kind: 'spot', label: 'Spot', Icon: RoomIcon },
] as const;

function Step1() {
  const {
    actions: { setDatakind },
  } = useInserterContext();

  return (
    <Stack
      alignItems="center"
      gap={5}
      sx={{ width: '100%', maxWidth: 860, mx: 'auto', py: 3, px: { xs: 2, sm: 3 } }}
    >
      <Typography variant="h2" sx={{ textAlign: 'center', fontSize: { xs: 28, sm: 36 } }}>
        What would you like to add?
      </Typography>
      <Stack
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 300px)', sm: 'repeat(2, minmax(0, 300px))' },
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {MAIN_OPTIONS.map(({ kind, label, description, Icon }) => (
          <ButtonBase
            key={kind}
            onClick={() => setDatakind(kind)}
            sx={{
              flexDirection: 'column',
              gap: 2,
              px: 3,
              py: 4,
              minHeight: 240,
              border: 'var(--border)',
              borderRadius: 'var(--border-radius)',
              backgroundColor: 'white',
              color: 'var(--text-color)',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
              '&:hover': {
                borderColor: 'var(--secondary-color)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
              },
              '&.Mui-focusVisible': {
                outline: '2px solid var(--secondary-color)',
                outlineOffset: 3,
              },
            }}
          >
            <Icon sx={{ fontSize: 64, color: 'var(--text-color)' }} />
            <Typography component="span" sx={{ fontSize: 28, fontWeight: 600 }}>
              {label}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: 240,
                textAlign: 'center',
                textWrap: kind === 'trip' ? 'balance' : undefined,
              }}
            >
              {description}
            </Typography>
          </ButtonBase>
        ))}
      </Stack>
      <Stack gap={2} alignItems="center" sx={{ width: '100%' }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Or add individual data to an existing trip
        </Typography>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: 1.5,
            width: '100%',
            maxWidth: 620,
          }}
        >
          {INDIVIDUAL_OPTIONS.map(({ kind, label, Icon }) => (
            <Button
              key={kind}
              variant="outlined"
              color="secondary"
              startIcon={<Icon />}
              onClick={() => setDatakind(kind)}
              sx={{ py: 1.25, textTransform: 'none', fontStyle: 'normal', fontWeight: 600 }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Step1;
