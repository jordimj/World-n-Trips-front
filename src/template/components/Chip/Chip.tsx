import { Chip as MuiChip } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  variant: 'trip' | 'worktrip' | 'telework';
  label: string;
}

function Chip({ variant = 'trip', label }: Props) {
  const isJournalChip = variant === 'worktrip' || variant === 'telework';

  return (
    <MuiChip
      variant="outlined"
      label={isJournalChip ? variant : label}
      size={isJournalChip ? 'small' : 'medium'}
      sx={{
        backgroundColor: 'white',
        fontSize: '12px',
        px: isJournalChip ? 2 : 0,
        mt: 2,
      }}
      {...(isJournalChip && {
        icon: variant === 'worktrip' ? <WorkIcon /> : <ComputerIcon />,
      })}
    />
  );
}

export default Chip;
