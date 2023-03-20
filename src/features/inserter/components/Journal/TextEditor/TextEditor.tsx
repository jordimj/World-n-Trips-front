import React from 'react';
import Button from '@mui/material/Button';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Box, ButtonGroup, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useClipboard from '../../../hooks/useClipboard';
import { useInserterContext } from '../../../hooks/useInserterContext';
import styles from './TextEditor.module.css';

export default function TextEditor() {
  const {
    state: {
      journal: { editorState },
    },
    actions: { setEditorState },
  } = useInserterContext();

  const { copyToClipboard, pasteFromClipboard, snackbar } = useClipboard();

  // const _onBoldClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  // };
  const _onBoldMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const _onItalicMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const _onUnderlineMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBlockquote = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'BLOCKQUOTE'));
  };

  const onUnorderedList = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
  };

  const clearEditor = () => setEditorState(EditorState.createEmpty());

  const copyText = () => copyToClipboard(editorState.getCurrentContent().getPlainText());

  const pasteText = async () => {
    const text = (await pasteFromClipboard()) ?? '';

    const newContent = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text
    );

    setEditorState(EditorState.push(editorState, newContent, 'insert-characters'));
  };

  return (
    <Box className={styles.container}>
      <Stack direction="row" gap={1} justifyContent="center" sx={{ my: 1 }}>
        <ButtonGroup variant="contained">
          <Button onMouseDown={(e) => _onBoldMouseDown(e)}>
            <FormatBoldIcon />
          </Button>
          <Button onMouseDown={(e) => _onItalicMouseDown(e)}>
            <FormatItalicIcon />
          </Button>
          <Button onMouseDown={(e) => _onUnderlineMouseDown(e)}>
            <FormatUnderlinedIcon />
          </Button>
          <Button onMouseDown={(e) => onBlockquote(e)}>
            <FormatQuoteIcon />
          </Button>
          <Button onMouseDown={(e) => onUnorderedList(e)}>
            <FormatListBulletedIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={copyText}>
            <ContentCopyIcon />
          </Button>
          <Button onClick={pasteText}>
            <ContentPasteIcon />
          </Button>
          <Button onClick={clearEditor}>
            <RestartAltIcon />
          </Button>
        </ButtonGroup>
      </Stack>
      <Box className={styles.textEditor}>
        <Editor editorState={editorState} onChange={setEditorState} spellCheck />
      </Box>
      {snackbar}
    </Box>
  );
}
