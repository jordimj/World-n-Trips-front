import React, { useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TextEditor from './TextEditor/TextEditor';
import { Box, Button, ButtonGroup } from '@mui/material';
import useClipboard from '../../hooks/useClipboard';
import { InserterContext } from '../../context/InserterContext';
import { InserterDispatchContext } from '../../context/InserterDispatchContext';

export default function Journal() {
  const {
    journal: { title },
  } = useContext(InserterContext);
  const dispatch = useContext(InserterDispatchContext);

  const { copyToClipboard, pasteFromClipboard, snackbar } = useClipboard();

  const onChangeTitle = (title: string) =>
    dispatch({ type: 'SET_JOURNAL_TITLE', payload: title });

  const pasteTitle = async () => onChangeTitle((await pasteFromClipboard()) ?? '');

  return (
    <Stack gap={2} justifyContent="center" alignItems="center" sx={{ width: '90%' }}>
      <FormControl sx={{ maxWidth: '1600px', mt: 6, width: '50%', minWidth: '400px' }}>
        <Stack direction="row" gap={2}>
          <TextField
            label="Title of the day"
            variant="outlined"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
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
