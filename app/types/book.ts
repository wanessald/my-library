export type Author = {
  id: string;
  name: string;
};

export type Genre = {
  id: string;
  genre: string;
};

export type ReadingStatus =
  | "QUERO LER"
  | "LENDO"
  | "LIDO"
  | "PAUSADO"
  | "ABANDONADO";

export type Book = {
  id: number;
  title: string;
  author: Author;
  genre: Genre;
  year?: number;
  pages?: number;
  rating?: number;
  synopsis: string;
  cover: string;
  status: ReadingStatus;
  currentPage?: number;
  isbn?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};
