import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CopyPastableField from '@/template/components/CopyPastableField';
import useInserterContext from '../../hooks/useInserterContext';
import styles from './Trip.module.css';

export default function Trip() {
  const {
    state: { trip },
    actions: { setTripName, setTripSummary, setTripCover, setTripWork },
  } = useInserterContext();
  const { name = '', summary = '', coverImage = '', work = null } = trip ?? {};

  return (
    <Stack className={styles.container} gap={3}>
      <Stack gap={0.5}>
        <Typography color="text.secondary">
          Start with the essentials. You can add your itinerary below.
        </Typography>
      </Stack>
      <CopyPastableField label="Title of the trip" value={name} setValue={setTripName} />
      <CopyPastableField label="Summary" value={summary} setValue={setTripSummary} />
      <TextField
        label="Cover image URL"
        value={coverImage}
        onChange={(event) => setTripCover(event.target.value)}
        type="url"
        placeholder="https://…"
        sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
        fullWidth
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={2}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
      >
        <Stack gap={0.25}>
          <Typography sx={{ color: 'var(--text-color)' }}>
            Did you work during this trip?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Optional
          </Typography>
        </Stack>
        <ToggleButtonGroup
          value={work}
          exclusive
          onChange={(_, value) => setTripWork(value)}
          aria-label="Work during trip"
          sx={{ backgroundColor: 'white' }}
          size="small"
        >
          <ToggleButton
            value="telework"
            sx={{
              gap: 1,
              px: 2,
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: 1,
              textTransform: 'none',
              fontStyle: 'normal',
              fontWeight: 600,
              '& .MuiSvgIcon-root': { display: 'block', flexShrink: 0 },
            }}
          >
            <KeyboardAltOutlinedIcon fontSize="small" />
            <span>Telework</span>
          </ToggleButton>
          <ToggleButton
            value="worktrip"
            sx={{
              gap: 1,
              px: 2,
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: 1,
              textTransform: 'none',
              fontStyle: 'normal',
              fontWeight: 600,
              '& .MuiSvgIcon-root': { display: 'block', flexShrink: 0 },
            }}
          >
            <WorkOutlinedIcon fontSize="small" />
            <span>Worktrip</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
}
