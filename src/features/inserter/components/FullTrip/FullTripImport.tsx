import { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTripWithData, getProvinces, saveNewData } from '@/api';
import AutocompleteCountries from '@/template/components/Autocomplete/AutocompleteCountries';
import { InserterContext } from '../../context/InserterContext';
import useCategories from '../../hooks/useCategories';
import useInserterContext from '../../hooks/useInserterContext';
import useTripValidation from '../../hooks/useTripValidation';
import type { TableData } from '../../types';
import { LABELS, parseWorkbook, TripSheet, validateSheets } from '../../utils/fullTrip';
import DataTable from '../DataTable/DataTable';
import Trip from '../Trip';
import TripConfirmation from '../Trip/TripConfirmation';
import stepperStyles from '../Stepper/Stepper.module.css';

export default function FullTripImport({ onBack }: { onBack: () => void }) {
  const {
    state,
    actions: { resetState },
  } = useInserterContext();
  const navigate = useNavigate();
  const { trip } = state;
  const { isValid: tripValid } = useTripValidation({ trip });
  const [sheets, setSheets] = useState<TripSheet[]>([]);
  const [filename, setFilename] = useState('');
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(0);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const requestInFlight = useRef(false);
  const uploadRevision = useRef(0);
  const queryClient = useQueryClient();
  const needsCategories = sheets.some((sheet) => sheet.kind === 'expense');
  const needsProvinces = sheets.some((sheet) => sheet.kind === 'spot');
  const needsCountry = sheets.some((sheet) => sheet.kind !== 'day');
  const {
    data: categories,
    isError: categoryError,
    refetch: reloadCategories,
  } = useCategories(needsCategories);
  const {
    data: provinces,
    isError: provinceError,
    refetch: reloadProvinces,
  } = useQuery({ queryKey: ['provinces'], queryFn: getProvinces, enabled: needsProvinces });
  const validationErrors = validateSheets(sheets, categories, provinces);
  const ready =
    tripValid &&
    (!needsCountry || countryId !== null) &&
    !validationErrors.length &&
    (!needsCategories || !!categories) &&
    (!needsProvinces || !!provinces);
  const active = sheets[selected];

  async function upload(file: File) {
    const revision = ++uploadRevision.current;
    setError('');
    setSheets([]);
    setFilename('');
    setSelected(0);
    setBusy(true);
    try {
      if (!/\.xlsx$/i.test(file.name))
        throw new Error('Export the Numbers workbook as an Excel (.xlsx) file first.');
      if (file.size > 20 * 1024 * 1024)
        throw new Error('Please select a workbook smaller than 20 MB.');
      const { Workbook } = await import('exceljs');
      const workbook = new Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      if (revision !== uploadRevision.current) return;
      setSheets(parseWorkbook(workbook));
      setFilename(file.name);
    } catch (failure) {
      if (revision === uploadRevision.current)
        setError((failure as Error).message || 'Could not read this Excel workbook.');
    } finally {
      if (revision === uploadRevision.current) setBusy(false);
    }
  }

  function removeWorkbook() {
    ++uploadRevision.current;
    setSheets([]);
    setFilename('');
    setSelected(0);
    setCountryId(null);
    setError('');
    setBusy(false);
  }

  async function createTrip() {
    // Server errors remain visible while allowing a corrected import to be retried.
    if (
      !tripValid ||
      validationErrors.length ||
      (needsCountry && countryId === null) ||
      (needsCategories && !categories) ||
      (needsProvinces && !provinces) ||
      requestInFlight.current ||
      !trip
    )
      return;
    requestInFlight.current = true;
    setBusy(true);
    setError('');
    const body = new FormData();
    body.append('name', trip.name);
    body.append('summary', trip.summary);
    body.append('coverImage', trip.coverImage ?? '');
    body.append('worktrip', trip.work === 'worktrip' ? '1' : '0');
    body.append('telework', trip.work === 'telework' ? '1' : '0');
    try {
      let created: { tripId: number };
      if (sheets.length) {
        body.append(
          'tables',
          JSON.stringify(
            sheets.map((sheet) => ({
              kind: sheet.kind,
              countryId: sheet.kind === 'day' ? undefined : countryId,
              rows: sheet.rows.map(({ sourceRow, id, ...row }) => row),
            }))
          )
        );
        created = await createTripWithData(body);
      } else created = await saveNewData('trip', body);
      void Promise.all(
        [
          'trips',
          'country',
          'countries',
          'visitedCountries',
          'provinces',
          'journalAvailableDates',
          'search',
          'statistics',
          'journals',
          'range-statistics',
          'expenses',
          'ephemerides',
        ].map((key) => queryClient.invalidateQueries({ queryKey: [key] }))
      );
      resetState();
      navigate(`/trips/${created.tripId}`);
    } catch (failure) {
      const response = (
        failure as {
          response?: { data?: { message?: string; errors?: Record<string, unknown> } | string };
        }
      ).response?.data;
      setError(
        typeof response === 'string'
          ? response
          : response?.message ||
              'Creation could not be confirmed. Check the trip before retrying if the connection was interrupted.'
      );
    } finally {
      requestInFlight.current = false;
      setBusy(false);
    }
  }

  return (
    <Fragment>
      <Stepper activeStep={step} alternativeLabel className={stepperStyles.stepper}>
        {['Trip details', 'Review'].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stack
        gap={4}
        sx={{
          px: { xs: 1, sm: 3 },
          py: 3,
          borderTop: 'var(--border)',
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          overflow: 'auto',
          minHeight: 0,
          flex: 1,
          justifyContent: step === 0 ? 'safe center' : 'flex-start',
          '& > *': { flexShrink: 0 },
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        {step === 0 && (
          <>
            <Trip />
            <Divider sx={{ width: '90%', maxWidth: 760, alignSelf: 'center' }} />
            <Stack
              gap={2}
              sx={{
                width: '90%',
                maxWidth: 760,
                alignSelf: 'center',
              }}
            >
              <Stack gap={0.75} alignItems="center" textAlign="center">
                <Stack direction="row" gap={1.5} alignItems="center">
                  <Typography component="h3" sx={{ fontSize: 20, fontWeight: 600 }}>
                    Add your itinerary
                  </Typography>
                  <Chip label="Optional" size="small" variant="outlined" />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Import days, nights, expenses and spots from an Excel file.
                </Typography>
              </Stack>
              <Stack gap={1.5} alignItems="center">
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  {filename && (
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ overflowWrap: 'anywhere', minWidth: 0 }}
                    >
                      {filename} contains:
                    </Typography>
                  )}
                  {!filename && (
                    <Button
                      variant="outlined"
                      component="label"
                      disabled={busy}
                      size="medium"
                      startIcon={<UploadFileOutlinedIcon />}
                      sx={{ px: 3, py: 1, textTransform: 'none' }}
                    >
                      Select Excel file
                      <input
                        aria-label="Upload trip Excel"
                        type="file"
                        accept=".xlsx"
                        hidden
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) void upload(file);
                          event.target.value = '';
                        }}
                      />
                    </Button>
                  )}
                  {!filename && error && (
                    <Tooltip title="Remove Excel file">
                      <span>
                        <IconButton
                          aria-label="Remove Excel file"
                          size="small"
                          disabled={busy}
                          onClick={removeWorkbook}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                </Stack>
                {filename && (
                  <Stack
                    direction="row"
                    gap={1}
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {sheets.map((sheet) => (
                      <Chip
                        key={sheet.kind}
                        size="small"
                        variant="outlined"
                        label={`${sheet.rows.length} ${LABELS[sheet.kind].toLowerCase()}`}
                      />
                    ))}
                    <Tooltip title="Remove Excel file">
                      <span>
                        <IconButton
                          aria-label="Remove Excel file"
                          size="small"
                          disabled={busy}
                          onClick={removeWorkbook}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                )}
                {needsCountry && (
                  <Stack gap={1} alignItems="center" sx={{ width: '100%', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Add all this data to this country:
                    </Typography>
                    <AutocompleteCountries
                      disabled={busy}
                      valueId={countryId}
                      onChangeOption={setCountryId}
                      sx={{ width: { xs: '100%', sm: 280 } }}
                    />
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Stack direction="row" gap={2} justifyContent="center" sx={{ pt: 1, pb: 2 }}>
              <Button variant="outlined" color="secondary" disabled={busy} onClick={onBack}>
                Back
              </Button>
              <Button
                variant="contained"
                disabled={!tripValid || busy || !!error || (needsCountry && countryId === null)}
                onClick={() => setStep(1)}
              >
                Review trip
              </Button>
            </Stack>
          </>
        )}
        {step === 1 && (
          <>
            <TripConfirmation />
            {active && (
              <>
                {needsCategories && !categories && (
                  <Alert severity={categoryError ? 'error' : 'info'}>
                    {categoryError
                      ? 'Could not load expense categories.'
                      : 'Loading expense categories…'}
                    {categoryError && (
                      <Button onClick={() => void reloadCategories()}>Retry</Button>
                    )}
                  </Alert>
                )}
                {needsProvinces && !provinces && (
                  <Alert severity={provinceError ? 'error' : 'info'}>
                    {provinceError ? 'Could not load provinces.' : 'Loading provinces…'}
                    {provinceError && <Button onClick={() => void reloadProvinces()}>Retry</Button>}
                  </Alert>
                )}
                {!!validationErrors.length && (
                  <Alert severity="error">
                    <Typography>{validationErrors.length} issues to resolve:</Typography>
                    <ul>
                      {validationErrors.slice(0, 15).map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                    </ul>
                    <Typography>
                      Edit expense details and province names below, or go back and replace the
                      workbook.
                    </Typography>
                  </Alert>
                )}
                <Tabs centered value={selected} onChange={(_, value: number) => setSelected(value)}>
                  {sheets.map((sheet) => (
                    <Tab key={sheet.kind} label={`${LABELS[sheet.kind]} (${sheet.rows.length})`} />
                  ))}
                </Tabs>
                <Stack
                  sx={{
                    width: '100%',
                    maxWidth: 1200,
                    alignSelf: 'center',
                    alignItems: 'center',
                    pointerEvents: busy ? 'none' : 'auto',
                    opacity: busy ? 0.6 : 1,
                    '& > .MuiTableContainer-root': { width: '100%', mx: 0 },
                  }}
                >
                  <InserterContext
                    value={[
                      {
                        ...state,
                        dataKind: active.kind,
                        parsedData: active.rows.map((row, index) => ({
                          ...row,
                          id: index + 1,
                        })) as unknown as TableData,
                      },
                      (action) => {
                        if (action.type === 'SET_PARSED_DATA' && !busy) {
                          setError('');
                          setSheets((current) =>
                            current.map((sheet, index) =>
                              index === selected
                                ? {
                                    ...sheet,
                                    rows: action.payload as unknown as Record<string, string>[],
                                  }
                                : sheet
                            )
                          );
                        }
                      },
                    ]}
                  >
                    <DataTable />
                  </InserterContext>
                </Stack>
              </>
            )}
            <Stack direction="row" gap={2} justifyContent="center">
              <Button
                disabled={busy}
                onClick={() => {
                  setError('');
                  setStep(0);
                }}
              >
                Back to trip details
              </Button>
              <Button
                variant="contained"
                disabled={!ready || busy}
                onClick={() => void createTrip()}
              >
                {busy ? 'Creating trip…' : 'Create trip'}
              </Button>
            </Stack>
          </>
        )}
        {busy && <CircularProgress aria-label="Processing trip" sx={{ alignSelf: 'center' }} />}
      </Stack>
    </Fragment>
  );
}
