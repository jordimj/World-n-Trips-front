import { Box, Button, ButtonGroup, FormControl, Stack, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import useClipboard from '../../hooks/useClipboard';
import { useInserterContext } from '../../hooks/useInserterContext';
import TextEditor from './TextEditor/TextEditor';

export default function Journal() {
  const {
    state: {
      journal: { title },
    },
    actions: { setTitle },
  } = useInserterContext();

  const { copyToClipboard, pasteFromClipboard, snackbar } = useClipboard();
  const pasteTitle = async () => setTitle((await pasteFromClipboard()) ?? '');

  return (
    <Stack gap={2} justifyContent="center" alignItems="center" sx={{ width: '90%' }}>
      <FormControl sx={{ maxWidth: '1600px', mt: 6, width: '50%', minWidth: '400px' }}>
        <Stack direction="row" gap={2}>
          <TextField
            label="Title of the day"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              backgroundColor: 'var(--background-color-light)',
              borderRadius: 'var(--border-radius)',
              width: '100%',
              position: 'relative',
              '& input': {
                width: 'calc(100% - 150x)',
              },
            }}
          />
          <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
            <ButtonGroup disableElevation variant="contained">
              <Button onClick={() => copyToClipboard(title)}>
                <ContentCopyIcon />
              </Button>
              <Button onClick={pasteTitle}>
                <ContentPasteIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </FormControl>
      <TextEditor />
      {snackbar}
    </Stack>
  );
}
