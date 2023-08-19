import COUNTRIES from '@/constants/countryCodes';
import { getCountryFlagSrc } from '@/utils';
import styles from './CountryFlag.module.css';

interface Props {
  name: string;
  height?: 32 | 75;
}

function CountryFlag(props: Props) {
  const { name, height } = props;
  const countryCode = COUNTRIES[name as keyof typeof COUNTRIES];

  return (
    <img
      className={styles.flag}
      src={getCountryFlagSrc(countryCode)}
      alt={`${name}'s flag`}
      loading="lazy"
      {...(height && { height })}
    />
  );
}

export default CountryFlag;
