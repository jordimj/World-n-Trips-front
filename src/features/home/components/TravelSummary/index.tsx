import useStatistics from '@/features/statistics/hooks/useStatistics';
import styles from './TravelSummary.module.css';

export default function TravelSummary() {
  const { data, isPending, isError, refetch } = useStatistics();
  const metrics = [
    { label: 'Countries visited', value: data?.countries?.all.visited },
    { label: 'Total trips', value: data?.metrics?.trips },
    { label: 'Days traveling', value: data?.metrics?.days },
  ];
  return (
    <div className={styles.root} aria-label="Travel statistics" aria-busy={isPending}>
      <dl className={styles.metrics}>
        {metrics.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              {isPending ? (
                <span className={styles.loading} aria-label="Loading" />
              ) : (
                (value?.toLocaleString('en-US') ?? '—')
              )}
            </dd>
          </div>
        ))}
      </dl>
      {isError && (
        <p role="alert">
          Travel totals couldn’t be loaded.{' '}
          <button onClick={() => void refetch()}>Try again</button>
        </p>
      )}
    </div>
  );
}
