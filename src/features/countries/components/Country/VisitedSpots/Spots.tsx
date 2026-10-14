import { useId } from 'react';
import styles from './Spots.module.css';

interface Props {
  spots: Array<string>;
}
function Spots({ spots }: Props) {
  const id = useId();
  const groups = new Map<string, string[]>();
  [...spots]
    .sort((a, b) => a.localeCompare(b))
    .forEach((spot) => {
      const letter =
        spot
          .trim()
          .charAt(0)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleUpperCase() || '#';
      const items = groups.get(letter) ?? [];
      items.push(spot);
      groups.set(letter, items);
    });
  return (
    <div className={styles.visitedSpots}>
      {[...groups].map(([letter, items]) => (
        <section className={styles.group} key={letter} aria-labelledby={`${id}-${letter}`}>
          <h3 id={`${id}-${letter}`}>{letter}</h3>
          <ul>
            {items.map((spot) => (
              <li key={spot}>{spot}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
export default Spots;
