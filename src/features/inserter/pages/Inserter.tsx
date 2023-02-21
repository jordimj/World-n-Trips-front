import { useState } from 'react';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import CloseIcon from '@mui/icons-material/Close';
import AppStepper from '../components/AppStepper/AppStepper';

export interface InserterDialogProps {
  open: boolean;
  onClose: () => void;
}

function InserterDialog(props: InserterDialogProps) {
  const { onClose, open } = props;
  const handleClose = () => onClose();

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
      <DialogTitle sx={{ display: 'flex' }}>
        New data parser & inserter
        <IconButton
          aria-label="close-inserter-dialog"
          onClick={onClose}
          sx={{ ml: 'auto' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <AppStepper />
    </Dialog>
  );
}

export default function Inserter() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <PublishIcon onClick={handleClickOpen} sx={{ color: 'white' }} />
      <InserterDialog open={open} onClose={handleClose} />
    </div>
  );
}
