import { Divider as MuiDivider, DividerProps } from '@mui/material';
import useElementOnScreen from '@/hooks/useElementOnScreen';
import styles from './Divider.module.css';

interface Props extends DividerProps {}

function Divider(props: Props) {
  const [ref, isIntersecting] = useElementOnScreen<HTMLHRElement>();

  return (
    <MuiDivider
      ref={ref}
      className={[styles.divider, isIntersecting && styles.intersecting]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}

export default Divider;
