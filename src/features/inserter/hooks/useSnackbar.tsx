import { forwardRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarMessage {
  label: string;
  sublabel?: string;
  severity?: AlertColor;
}

interface SnackbarMessages extends Array<SnackbarMessage> {}

function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<SnackbarMessages>([]);

  const openSnackbar = (messages: SnackbarMessages) => {
    setMessages(messages);
    setOpen(true);
  };

  const closeSnackbar = () => setOpen(false);

  const snackbar = (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {messages.map((message, idx) => (
        <Snackbar key={idx} open={open} autoHideDuration={5000} onClose={closeSnackbar}>
          <Alert severity={message.severity ?? 'success'} sx={{ width: '100%' }}>
            <AlertTitle sx={{ fontWeight: 600 }}>{message.label}</AlertTitle>
            {message.sublabel ?? null}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );

  return { openSnackbar, snackbar };
}

export default useSnackbar;
