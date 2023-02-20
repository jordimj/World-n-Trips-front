import * as React from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import { blue } from '@mui/material/colors';
import AppStepper from '../components/AppStepper/AppStepper';
import { Dialog, DialogTitle } from '@mui/material';

export interface InserterDialogProps {
  open: boolean;
  onClose: () => void;
}

function InserterDialog(props: InserterDialogProps) {
  const { onClose, open } = props;
  const handleClose = () => onClose();

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
      <DialogTitle>New data parser & inserter</DialogTitle>
      <AppStepper />
    </Dialog>
  );
}

export default function Inserter() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <PublishIcon onClick={handleClickOpen} sx={{ color: 'white' }} />
      <InserterDialog open={open} onClose={handleClose} />
    </div>
  );
}
