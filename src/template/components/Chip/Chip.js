import { Chip as MuiChip } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import WorkIcon from '@mui/icons-material/Work';

function Chip({ variant = 'trip', label }) {
  const isJournalChip = variant === 'worktrip' || variant === 'telework';

  return (
    <MuiChip
      variant="outlined"
      label={isJournalChip ? variant : label}
      size={isJournalChip ? 'small' : 'medium'}
      sx={{ px: isJournalChip ? 2 : 0, mt: 2, fontSize: '12px' }}
      {...(isJournalChip && {
        icon: variant === 'worktrip' ? <WorkIcon /> : <ComputerIcon />,
      })}
    />
  );
}

export default Chip;
