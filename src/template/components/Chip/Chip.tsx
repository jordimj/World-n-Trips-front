import ComputerIcon from '@mui/icons-material/Computer';
import WorkIcon from '@mui/icons-material/Work';
import { capitalize, Chip as MuiChip, Stack, Typography } from '@mui/material';
import EXPENSE_CATEGORIES from '@/constants/expenseCategoryEmojis';

interface Props {
  variant?: 'trip' | 'worktrip' | 'telework' | 'city' | 'category';
  label?: string;
  className?: string;
}

function Chip(props: Props) {
  const { variant = 'trip', label, className } = props;
  const isJournalChip = variant === 'worktrip' || variant === 'telework';

  if (variant === 'city') {
    return (
      <MuiChip
        label={label}
        sx={{ width: 'fit-content', backgroundColor: 'var(--background-color-dark)' }}
      />
    );
  }

  if (variant === 'category') {
    const { background, color, emoji } =
      EXPENSE_CATEGORIES[label as keyof typeof EXPENSE_CATEGORIES];

    return (
      <MuiChip
        label={
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography>{emoji}</Typography>
            <Typography sx={{ color: `${color} !important`, fontSize: '12px!important' }}>
              {capitalize(label ?? '')}
            </Typography>
          </Stack>
        }
        sx={{
          width: 'fit-content',
          backgroundColor: background,
        }}
      />
    );
  }

  return (
    <MuiChip
      variant="outlined"
      {...(className && { className })}
      label={isJournalChip ? variant : label}
      size={isJournalChip ? 'small' : 'medium'}
      sx={{
        width: 'fit-content',
        backgroundColor: isJournalChip ? 'white' : 'var(--background-color-dark)',
        fontSize: 12,
        px: isJournalChip ? 2 : 0,
        borderColor: 'var(--primary-color-500)',
      }}
      {...(isJournalChip && {
        icon: variant === 'worktrip' ? <WorkIcon /> : <ComputerIcon />,
      })}
    />
  );
}

export default Chip;
