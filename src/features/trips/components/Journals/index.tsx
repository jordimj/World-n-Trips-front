import {
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import parse from 'html-react-parser';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Spinner from '@/template/components/Spinner/Spinner';
import useJournals from '../../hooks/useJournals';
import styles from './Journals.module.css';

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

// Map normalized matches back to the original text so accents and formatting survive.
function highlightText(text: string, term: string): ReactNode {
  if (!term) return text;
  let searchable = '';
  const offsets: { start: number; end: number }[] = [];
  let offset = 0;
  for (const character of text) {
    const normalized = normalize(character);
    for (let index = 0; index < normalized.length; index++)
      offsets.push({ start: offset, end: offset + character.length });
    if (!normalized && offsets.length) offsets[offsets.length - 1].end = offset + character.length;
    searchable += normalized;
    offset += character.length;
  }
  const parts: ReactNode[] = [];
  let cursor = 0;
  let match = searchable.indexOf(term);
  while (match >= 0) {
    const start = offsets[match].start;
    const end = offsets[match + term.length - 1].end;
    parts.push(text.slice(cursor, start), <mark key={start}>{text.slice(start, end)}</mark>);
    cursor = end;
    match = searchable.indexOf(term, match + term.length);
  }
  parts.push(text.slice(cursor));
  return parts;
}

const dateLabel = (date: Date, options: Intl.DateTimeFormatOptions) =>
  date.toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });

function prepareText(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script,style,iframe,object,embed').forEach((node) => node.remove());
  doc.body.querySelectorAll('*').forEach((node) => {
    Array.from(node.attributes).forEach(({ name, value }) => {
      if (name === 'href' && /^(https?:|mailto:|#|\/)/i.test(value)) return;
      node.removeAttribute(name);
    });
  });
  return { html: doc.body.innerHTML, plain: doc.body.textContent ?? '' };
}

function Journals({ query }: { query: ReturnType<typeof useJournals> }) {
  const [, setSearchParams] = useSearchParams();
  const prefix = useId();
  const rootRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const filterScrollRef = useRef<{ height: number; top: number } | null>(null);
  const [toolsStuck, setToolsStuck] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [opened, setOpened] = useState<number | null | undefined>(undefined);
  const [navigation, setNavigation] = useState<{ id: number } | null>(null);
  const { data, isLoading, isError, refetch } = query;
  const entries = useMemo(
    () =>
      [...(data ?? [])]
        .sort((a, b) => a.date.getTime() - b.date.getTime() || a.journalId - b.journalId)
        .map((journal) => ({ ...journal, content: prepareText(journal.text) })),
    [data]
  );
  const activeId = opened === undefined ? entries[0]?.journalId : opened;
  const term = normalize(keyword.trim());
  const visibleEntries = entries.filter((entry) =>
    normalize(entry.title + ' ' + entry.content.plain).includes(term)
  );
  useLayoutEffect(() => {
    const previous = filterScrollRef.current;
    const spacer = spacerRef.current;
    if (!previous || !spacer) return;
    filterScrollRef.current = null;
    spacer.style.height = '0px';
    const naturalHeight = document.documentElement.scrollHeight;
    // Retain only the removed space during the animation, then discard it.
    spacer.style.height = `${Math.max(0, previous.height - naturalHeight)}px`;
    window.scrollTo({ top: previous.top, behavior: 'instant' });
    const sectionTop = (rootRef.current?.getBoundingClientRect().top ?? 70) + window.scrollY - 70;
    const target = Math.max(0, Math.min(sectionTop, naturalHeight - window.innerHeight));
    let timeout: ReturnType<typeof setTimeout>;
    const finish = () => {
      spacer.style.height = '0px';
      window.removeEventListener('scrollend', finish);
      clearTimeout(timeout);
    };
    const frame = requestAnimationFrame(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: target, behavior: 'instant' });
        finish();
        return;
      }
      window.addEventListener('scrollend', finish, { once: true });
      window.scrollTo({ top: target, behavior: 'smooth' });
      timeout = setTimeout(finish, 1200);
    });
    return () => {
      cancelAnimationFrame(frame);
      finish();
    };
  }, [keyword]);

  useEffect(() => {
    if (!navigation) return;
    const entry = rootRef.current?.querySelector<HTMLElement>(
      `[data-journal-id="${navigation.id}"]`
    );
    entry?.querySelector<HTMLButtonElement>('h3 button')?.focus({ preventScroll: true });
    entry?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }, [navigation]);

  useEffect(() => {
    const updateSticky = () => {
      setToolsStuck(
        Boolean(toolsRef.current && toolsRef.current.getBoundingClientRect().top <= 70)
      );
    };
    updateSticky();
    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);
    return () => {
      window.removeEventListener('scroll', updateSticky);
      window.removeEventListener('resize', updateSticky);
    };
  }, [entries.length]);

  const navigate = (id: number, expand = true, clearSearch = false) => {
    if (clearSearch) setKeyword('');
    setOpened(expand ? id : null);
    setNavigation({ id });
  };

  return (
    <>
      <section ref={rootRef} className={styles.journals} aria-labelledby={`${prefix}-heading`}>
        <div className={styles.sectionTitle}>
          <h2 id={`${prefix}-heading`}>Journals</h2>
        </div>
        {isError ? (
          <Stack alignItems="center" gap={2}>
            <Typography>Unable to load journals.</Typography>
            <Button onClick={() => refetch()}>Retry</Button>
          </Stack>
        ) : isLoading ? (
          <Spinner />
        ) : entries.length > 0 ? (
          <>
            <div ref={toolsRef} className={styles.tools} data-stuck={toolsStuck}>
              <div className={styles.searchWrap}>
                <label htmlFor={`${prefix}-search`}>Search this trip</label>
                <SearchIcon aria-hidden="true" />
                <input
                  ref={searchRef}
                  id={`${prefix}-search`}
                  type="search"
                  placeholder="A place, a word, a memory…"
                  value={keyword}
                  onChange={(event) => {
                    const next = event.target.value;
                    const nextTerm = normalize(next.trim());
                    const nextCount = entries.filter((entry) =>
                      normalize(entry.title + ' ' + entry.content.plain).includes(nextTerm)
                    ).length;
                    if (nextCount < visibleEntries.length) {
                      filterScrollRef.current = {
                        height: document.documentElement.scrollHeight,
                        top: window.scrollY,
                      };
                    }
                    setKeyword(next);
                  }}
                />
              </div>
              <div className={styles.jump}>
                <label htmlFor={`${prefix}-jump`}>Jump to date</label>
                <select
                  id={`${prefix}-jump`}
                  value=""
                  onChange={(event) => {
                    if (event.target.value) navigate(Number(event.target.value), true, true);
                  }}
                >
                  <option value="">Choose a date</option>
                  {entries.map((entry) => (
                    <option key={entry.journalId} value={entry.journalId}>
                      {dateLabel(entry.date, { day: 'numeric', month: 'short' })} ·{' '}
                      {highlightText(entry.title, term)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className={styles.status} role="status">
              {term
                ? `${visibleEntries.length} of ${entries.length} entries match · Search includes titles and journal text`
                : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} · Oldest first`}
            </p>
            <ol className={styles.timeline}>
              {visibleEntries.map((entry) => {
                const index = entries.indexOf(entry);
                const isOpen = activeId === entry.journalId;
                const bodyId = `${prefix}-body-${entry.journalId}`;
                const match = term ? normalize(entry.content.plain).indexOf(term) : -1;
                const excerptStart = Math.max(0, match - 35);
                return (
                  <li
                    key={entry.journalId}
                    data-journal-id={entry.journalId}
                    className={`${styles.entry} ${isOpen ? styles.open : ''}`}
                  >
                    <time className={styles.date} dateTime={entry.date.toISOString().slice(0, 10)}>
                      <strong>{entry.date.getUTCDate()}</strong>
                      {dateLabel(entry.date, { month: 'short' })}
                    </time>
                    <h3>
                      <button
                        type="button"
                        className={styles.entryToggle}
                        aria-expanded={isOpen}
                        aria-controls={bodyId}
                        onClick={() => navigate(entry.journalId, !isOpen)}
                      >
                        <span className={styles.entryName}>
                          {highlightText(entry.title, term)}
                          <span className={styles.entryMeta}>
                            {dateLabel(entry.date, { weekday: 'long' })} · Entry {index + 1} of{' '}
                            {entries.length}
                          </span>
                          {match >= 0 && (
                            <span className={styles.entryMeta}>
                              {excerptStart > 0 ? '…' : ''}
                              {highlightText(
                                entry.content.plain.slice(excerptStart, match + term.length + 90),
                                term
                              )}
                              …
                            </span>
                          )}
                        </span>
                        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </button>
                    </h3>
                    <div id={bodyId} hidden={!isOpen} className={styles.reader}>
                      {isOpen && (
                        <>
                          <div className={styles.readingTop}>
                            <span>
                              {Math.max(
                                1,
                                Math.ceil(entry.content.plain.trim().split(/\s+/).length / 200)
                              )}{' '}
                              min read
                            </span>
                          </div>
                          <div className={styles.prose}>
                            {parse(entry.content.html, {
                              replace: (node) => {
                                if (term && node.type === 'text') {
                                  return <>{highlightText(node.data, term)}</>;
                                }
                              },
                            })}
                          </div>
                          <nav className={styles.next} aria-label="Journal entries">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => navigate(entries[index - 1].journalId, true, true)}
                            >
                              ← Previous entry
                            </button>
                            <button
                              type="button"
                              disabled={index === entries.length - 1}
                              onClick={() => navigate(entries[index + 1].journalId, true, true)}
                            >
                              Next entry →
                            </button>
                          </nav>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            {visibleEntries.length === 0 && (
              <p className={styles.empty}>
                No entries match this search. Try another word or{' '}
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() => {
                    setKeyword('');
                    searchRef.current?.focus();
                  }}
                >
                  clear the search
                </button>
                .
              </p>
            )}
          </>
        ) : (
          <div className={styles.emptyJournal}>
            <div className={styles.notebook} aria-hidden="true">
              <svg
                viewBox="0 0 32 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="3" width="24" height="34" rx="3" />
                <path d="M10 3v34M3 10h5M3 18h5M3 26h5M15 13h8M15 18h6" />
              </svg>
            </div>
            <div className={styles.emptyCopy}>
              <h3>Your trip, in your words</h3>
              <p>No entries yet. Add a moment, a day, or the whole story.</p>
            </div>
            <Button
              className={styles.addEntry}
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              onClick={() => setSearchParams({ dialog: 'inserter', inserterKind: 'journal' })}
            >
              Add first entry
            </Button>
          </div>
        )}
      </section>
      <div ref={spacerRef} aria-hidden="true" />
    </>
  );
}

export default Journals;
