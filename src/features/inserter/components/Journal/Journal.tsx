import React, { useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TextEditor from './TextEditor/TextEditor';
import { Button, ButtonGroup } from '@mui/material';
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

  // const pasteTitle = async () => setTitle((await pasteFromClipboard()) ?? '');

  return (
    <Stack gap={2} justifyContent="center" alignItems="center" sx={{ width: '90%' }}>
      <FormControl sx={{ maxWidth: '1600px', mt: 6 }}>
        <Stack direction="row" gap={2}>
          <TextField
            label="Title of the day"
            variant="outlined"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: '5px', width: '100%' }}
          />
          <ButtonGroup disableElevation variant="contained">
            <Button onClick={() => copyToClipboard(title)}>
              <ContentCopyIcon />
            </Button>
            {/* <Button onClick={pasteTitle}>
              <ContentPasteIcon />
            </Button> */}
          </ButtonGroup>
        </Stack>
      </FormControl>
      <TextEditor />
      {snackbar}
    </Stack>
  );
}
