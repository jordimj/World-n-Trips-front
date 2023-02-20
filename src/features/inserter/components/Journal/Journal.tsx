import React, { Dispatch, SetStateAction } from 'react';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { EditorState } from 'draft-js';
import TextEditor from './TextEditor/TextEditor';
import { Button, ButtonGroup } from '@mui/material';
import useClipboard from '../../hooks/useClipboard';

interface JournalProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

export default function Journal(props: JournalProps) {
  const { title, setTitle, editorState, setEditorState } = props;

  const { copyToClipboard, pasteFromClipboard, snackbar } = useClipboard();

  const pasteTitle = async () => setTitle((await pasteFromClipboard()) ?? '');

  return (
    <Stack gap={2} justifyContent="center" alignItems="center">
      <FormControl sx={{ width: '80%', maxWidth: '1600px', mt: 6 }}>
        <Stack direction="row" gap={2}>
          <TextField
            label="Title of the day"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: '5px', width: '100%' }}
          />
          <ButtonGroup disableElevation variant="contained">
            <Button onClick={() => copyToClipboard(title)}>
              <ContentCopyIcon />
            </Button>
            <Button onClick={pasteTitle}>
              <ContentPasteIcon />
            </Button>
          </ButtonGroup>
        </Stack>
      </FormControl>
      <TextEditor editorState={editorState} setEditorState={setEditorState} />
      {snackbar}
    </Stack>
  );
}
