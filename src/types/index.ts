export interface Book {
  id: number;
  name: string;
  abbrev: string;
  testament_id: number;
}

export interface Verse {
  id: number;
  version: string;
  chapter: number;
  verse: number;
  text: string;
  book_id: number;
} 