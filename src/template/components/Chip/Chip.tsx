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
        width: 'fit-content',
        backgroundColor: isJournalChip ? 'white' : 'var(--background-color-dark)',
        fontSize: isJournalChip ? 12 : 16,
        px: isJournalChip ? 2 : 1,
        mt: 2,
      }}
      {...(isJournalChip && {
        icon: variant === 'worktrip' ? <WorkIcon /> : <ComputerIcon />,
      })}
    />
  );
}

export default Chip;
