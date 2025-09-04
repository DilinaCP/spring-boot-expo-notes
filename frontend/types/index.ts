export interface Note {
  id?: number;
  title: string;
  content: string;
  dateCreated?: string;
  lastUpdated?: string;
}

export interface NotesState {
  items: Note[];
  loading: boolean;
  error: string | null;
}

