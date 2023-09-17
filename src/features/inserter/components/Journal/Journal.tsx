import { Stack } from '@mui/material';
import CopyPastableField from '@/template/components/CopyPastableField';
import useInserterContext from '../../hooks/useInserterContext';
import TextEditor from './TextEditor/TextEditor';

export default function Journal() {
  const {
    state: {
      journal: { title },
    },
    actions: { setTitle },
  } = useInserterContext();

  return (
    <Stack
      gap={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        maxWidth: '1200px',
        height: 'calc(100vh - 400px)',
      }}
    >
      <CopyPastableField label="Title of the day" value={title} setValue={setTitle} />
      <TextEditor />
    </Stack>
  );
}
