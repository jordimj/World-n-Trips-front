import Box from '@mui/material/Box';
import styles from './Spots.module.css';

function Spots({ spots }) {
  return (
    <Box className={styles.visitedSpots}>
      {spots.map((spot) => (
        <Box key={spot} className={styles.item}>
          {spot}
        </Box>
      ))}
    </Box>
  );
}

export default Spots;
