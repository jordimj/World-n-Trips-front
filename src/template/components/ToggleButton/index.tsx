import styles from './ToggleButton.module.css';

interface Option {
  id: string;
  label: string;
  onClick: () => void;
}

interface Props {
  options: Array<Option>;
  active: string;
}

export default function ToggleButton(props: Props) {
  const { options, active } = props;

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={option.onClick}
          className={`${styles.button} ${option.id === active ? styles.active : styles.inactive}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
