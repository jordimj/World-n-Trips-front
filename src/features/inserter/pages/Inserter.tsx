import { useSearchParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import Stepper from '../components/Stepper';
import { InserterProvider } from '../context/InserterProvider';
import useInserterContext from '../hooks/useInserterContext';

interface InserterDialogProps {
  open: boolean;
  onClose: () => void;
}

const TITLES = {
  trip: 'Create a trip',
  journal: 'Add a journal',
  day: 'Add days',
  night: 'Add nights',
  expense: 'Add expenses',
  spot: 'Add spots',
};

function InserterHeader({ onClose }: { onClose: () => void }) {
  const {
    state: { activeStep, dataKind },
  } = useInserterContext();
  const title = activeStep > 0 && dataKind ? TITLES[dataKind] : 'Add to your travels';

  return (
    <DialogTitle
      sx={{ display: 'flex', alignItems: 'center', px: 3, py: 2, color: 'var(--text-color)' }}
    >
      {title}
      <IconButton aria-label="close-inserter-dialog" onClick={onClose} sx={{ ml: 'auto' }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

function InserterDialog(props: InserterDialogProps) {
  const { onClose, open } = props;
  const handleClose = () => onClose();

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="xl"
      sx={{
        '.MuiDialog-paper': {
          height: 'calc(100% - 64px)',
          maxHeight: 'calc(100% - 64px)',
        },
      }}
    >
      <InserterProvider>
        <InserterHeader onClose={onClose} />
        <Stepper />
      </InserterProvider>
    </Dialog>
  );
}

export default function Inserter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const open = searchParams.get('dialog') === 'inserter';

  const handleClickOpen = () => setSearchParams({ dialog: 'inserter' });

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('dialog');
    setSearchParams(newParams);
  };

  return (
    <>
      <IconButton color="secondary" aria-label="open inserter dialog" onClick={handleClickOpen}>
        <FileUploadIcon />
      </IconButton>
      <InserterDialog open={open} onClose={handleClose} />
    </>
  );
}
