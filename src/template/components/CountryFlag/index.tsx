import COUNTRIES from '@/constants/countryCodes';
import { getCountryFlagSrc } from '@/utils';
import styles from './CountryFlag.module.css';

export function isCountryKey(name: string | number): name is keyof typeof COUNTRIES {
  return name in COUNTRIES;
}

interface Props {
  name: string;
  isXL?: boolean;
}

function CountryFlag(props: Props) {
  const { name, isXL = false } = props;

  if (!isCountryKey(name)) return null;

  return (
    <img
      className={[styles.flag, isXL && styles.xl].filter(Boolean).join(' ')}
      src={getCountryFlagSrc(COUNTRIES[name])}
      alt={`${name}'s flag`}
      loading="lazy"
    />
  );
}

export default CountryFlag;
