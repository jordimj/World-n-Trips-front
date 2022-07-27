import { Chip as MuiChip } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import WorkIcon from '@mui/icons-material/Work';

function Chip({ variant }) {
  return (
    <MuiChip
      icon={variant === 'worktrip' ? <WorkIcon /> : <ComputerIcon />}
      label={variant === 'worktrip' ? 'Worktrip' : 'Telework'}
      variant="outlined"
      size="small"
      sx={{ px: 2, mt: 2 }}
    />
  );
}

export default Chip;
