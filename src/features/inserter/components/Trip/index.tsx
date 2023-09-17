import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import CopyPastableField from '@/template/components/CopyPastableField';
import DatePicker from '@/template/components/DatePicker/DatePicker';
import useInserterContext from '../../hooks/useInserterContext';
import styles from './Trip.module.css';

export default function Trip() {
  const {
    state: { trip },
    actions: {
      setTripName,
      setTripSummary,
      setTripCover,
      setTripWork,
      setArrivalTripDate,
      setDepartureTripDate,
    },
  } = useInserterContext();

  const { name, summary, coverImage, arrivalDate, departureDate, work } = trip ?? {};

  const isTelework = work === 'telework';
  const isWorktrip = work === 'worktrip';

  return (
    <Stack className={styles.container} gap={3}>
      <Typography variant="h2">Add new trip</Typography>
      <Stack gap={3} justifyContent="center" alignItems="center">
        <CopyPastableField
          label="Title of the trip"
          value={name}
          setValue={setTripName}
        />
        <CopyPastableField label="Summary" value={summary} setValue={setTripSummary} />
        <CopyPastableField
          label="Cover image"
          value={coverImage}
          setValue={setTripCover}
        />
        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <DatePicker
            label="From"
            date={arrivalDate ?? null}
            handleChange={setArrivalTripDate}
          />
          <DatePicker
            label="To"
            date={departureDate ?? null}
            handleChange={setDepartureTripDate}
          />
        </Stack>
        <FormGroup className={styles.form}>
          <Typography className={styles.formText}>Traveling while working?</Typography>
          <FormControlLabel
            label="Telework"
            checked={isTelework}
            labelPlacement="bottom"
            onChange={() => setTripWork(isTelework ? null : 'telework')}
            control={
              <Checkbox
                icon={<KeyboardAltOutlinedIcon />}
                checkedIcon={<KeyboardIcon />}
              />
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
        </FormGroup>
      </Stack>
    </Stack>
  );
}
