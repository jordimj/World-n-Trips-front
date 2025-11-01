import Box from '@mui/material/Box';
import Chip from '@/template/components/Chip/Chip';
import styles from './Spots.module.css';

interface Props {
  spots: Array<string>;
}

function Spots(props: Props) {
  const { spots } = props;
  return (
    <Box className={styles.visitedSpots}>
      {spots.map((spot) => (
        <Chip key={spot} variant="city" label={spot} className={styles.item} />
      ))}
    </Box>
  );
}

export default Spots;
