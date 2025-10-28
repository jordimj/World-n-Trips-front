import { Stack, Typography } from '@mui/material';
import CountryFlag from '@/template/components/CountryFlag';
import styles from './CountryBox.module.css';

interface Props {
  name: string;
  onClick: () => void;
}

const CountryBox = ({ name, onClick }: Props) => (
  <Stack className={styles.countryBox} onClick={onClick}>
    <Typography
      sx={{
        fontWeight: 500,
        fontSize: 'var(--spacing-4)',
        letterSpacing: 'var(--uppercase-letter-spacing)',
        textTransform: 'uppercase',
      }}
    >
      {name}
    </Typography>
    <CountryFlag name={name} />
  </Stack>
);

export default CountryBox;
