import { capitalize, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import Select from '../../../../template/components/Select/Select';
import { KindOfData } from '../../types';
import { useInserterContext } from '../../hooks/useInserterContext';

const DATA_KINDS = ['day', 'night', 'spot', 'expense', 'journal'];

function Step1() {
  const {
    state: { dataKind },
    actions: { setDatakind },
  } = useInserterContext();

  const onDataKindClick = (event: SelectChangeEvent) =>
    setDatakind(event.target.value as KindOfData);

  return (
    <Stack alignItems="center" gap={2}>
      <Typography variant="h2">Select the kind of data to be imported</Typography>
      <Select
        label="Data to be parsed"
        value={dataKind}
        onChange={onDataKindClick}
        maxWidth={300}
      >
        {DATA_KINDS.map((kind) => (
          <MenuItem key={kind} value={kind}>
            {capitalize(kind)}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

export default Step1;
