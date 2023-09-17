import { ButtonGroup, FormControl, IconButton, Stack, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import useClipboard from '@/features/inserter/hooks/useClipboard';
import useHover from '@/features/inserter/hooks/useHover';
import styles from './CopyPastableField.module.css';
import { Fragment } from 'react';

interface Props {
  label: string;
  value?: string;
  setValue: (value: string) => void;
}

function CopyPastableField(props: Props) {
  const { label, value = '', setValue } = props;

  const { copyToClipboard, pasteFromClipboard, snackbar } = useClipboard();
  const pasteTitle = async () => setValue((await pasteFromClipboard()) ?? '');
  const { ref, isHovering } = useHover<HTMLDivElement>();

  return (
    <FormControl ref={ref} sx={{ maxWidth: '1600px', width: '100%', minWidth: '400px' }}>
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.textField}
      />
      <ButtonGroup
        className={[styles.buttons, isHovering && styles.hovered]
          .filter(Boolean)
          .join(' ')}
      >
        <IconButton size="large" onClick={() => copyToClipboard(value)}>
          <ContentCopyIcon />
        </IconButton>
        <IconButton size="large" onClick={pasteTitle}>
          <ContentPasteIcon />
        </IconButton>
      </ButtonGroup>
      {snackbar}
    </FormControl>
  );
}

export default CopyPastableField;
