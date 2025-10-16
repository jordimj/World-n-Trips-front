import { Stack, Typography } from '@mui/material';
import { DATA_APPENDICES } from '@/constants';
import { euroFormatter, numberFormatter } from '@/utils/number';
import styles from './Ranking.module.css';

interface Props {
  stats: Array<{ name: string; total: number }>;
  title: string;
  format?: string;
}

export default function Ranking(props: Props) {
  const { stats, title, format } = props;

  const dataFormat = (total: number) => {
    if (format === 'currency') return euroFormatter(total);
    if (format === 'kilometers') return numberFormatter(total, DATA_APPENDICES.KM);

    return total;
  };

  return (
    <Stack className={styles.container} gap={3}>
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Stack gap={1}>
        {stats.map(({ name, total }) => (
          <Stack className={styles.row} key={name}>
            <Typography sx={{ color: 'var(--primary-color-50)' }}>{name}</Typography>
            <Typography sx={{ color: 'var(--primary-color-200)' }}>{dataFormat(total)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
