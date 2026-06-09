import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import CopyPastableField from '@/template/components/CopyPastableField';
import useInserterContext from '../../hooks/useInserterContext';
import { ImageDropzone } from './ImageDropzone';
import styles from './Trip.module.css';

export default function Trip() {
  const {
    state: { trip },
    actions: { setTripName, setTripSummary, setTripCover, setTripWork, setTripFile },
  } = useInserterContext();

  const { name, summary, coverImage, work } = trip ?? {};

  const isTelework = work === 'telework';
  const isWorktrip = work === 'worktrip';

  return (
    <Stack className={styles.container} gap={3}>
      <Typography variant="h2">Add new trip</Typography>
      <Stack gap={3} justifyContent="center" alignItems="center">
        <Stack direction="row" gap={3} sx={{ width: '100%' }}>
          <Stack gap={3} sx={{ width: '100%' }}>
            <CopyPastableField label="Title of the trip" value={name} setValue={setTripName} />
            <CopyPastableField label="Summary" value={summary} setValue={setTripSummary} />
          </Stack>
          <FormGroup className={styles.form}>
            <Typography className={styles.formText}>Traveling while working?</Typography>
            <Stack className={styles.formIcons}>
              <FormControlLabel
                label="Telework"
                checked={isTelework}
                labelPlacement="bottom"
                onChange={() => setTripWork(isTelework ? null : 'telework')}
                control={
                  <Checkbox icon={<KeyboardAltOutlinedIcon />} checkedIcon={<KeyboardIcon />} />
                }
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isTelework ? 700 : 400,
                  },
                }}
              />
              <FormControlLabel
                label="Worktrip"
                checked={isWorktrip}
                labelPlacement="bottom"
                control={<Checkbox icon={<WorkOutlinedIcon />} checkedIcon={<WorkIcon />} />}
                onChange={() => setTripWork(isWorktrip ? null : 'worktrip')}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isWorktrip ? 700 : 400,
                  },
                }}
              />
            </Stack>
          </FormGroup>
        </Stack>
        <ImageDropzone value={trip?.imageFile} onChange={setTripFile} />
      </Stack>
    </Stack>
  );
}
