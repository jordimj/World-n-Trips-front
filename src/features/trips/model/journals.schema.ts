import { z } from 'zod';

const JournalSchema = z.object({
  journalId: z.number(),
  title: z.string(),
  text: z.string(),
  date: z.preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date()),
});

export const JournalsSchema = z.array(JournalSchema);

export type Journal = z.infer<typeof JournalSchema>;
export type Journals = z.infer<typeof JournalsSchema>;
