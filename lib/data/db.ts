// import Dexie, { Table } from "dexie";

// export interface Book {
//   id: string;
//   title: string;
//   author: string;
//   genre: string;
//   year?: number;
//   pages?: number;
//   rating?: number;
//   synopsis?: string;
//   cover?: string;
//   status: BookStatus;
// }

// export type BookStatus =
//   | "QUERO LER"
//   | "LENDO"
//   | "LIDO"
//   | "PAUSADO"
//   | "ABANDONADO";

// export const GENRES = [
//   "Literatura Brasileira",
//   "Ficção Científica",
//   "Realismo Mágico",
//   "Ficção",
//   "Fantasia",
//   "Romance",
//   "Biografia",
//   "História",
//   "Autoajuda",
//   "Tecnologia",
//   "Programação",
//   "Negócios",
//   "Psicologia",
//   "Filosofia",
//   "Poesia",
// ];

// export class MyLibraryDB extends Dexie {
//   books!: Table<Book, string>;

//   constructor() {
//     super("MyLibraryDB");
//     this.version(1).stores({
//       books: "id, title, author, genre, status",
//     });
//   }
// }

// export const db = new MyLibraryDB();

// // Pré-cadastro de 5 livros
// (async () => {
//   const count = await db.books.count();
//   if (count === 0) {
//     await db.books.bulkAdd([
//       {
//         id: "1",
//         title: "Dom Casmurro",
//         author: "Machado de Assis",
//         genre: "Literatura Brasileira",
//         year: 1899,
//         pages: 256,
//         rating: 5,
//         synopsis: "Clássico da literatura brasileira.",
//         cover: "",
//         status: "LIDO",
//       },
//       {
//         id: "2",
//         title: "1984",
//         author: "George Orwell",
//         genre: "Ficção Científica",
//         year: 1949,
//         pages: 328,
//         rating: 5,
//         synopsis: "Distopia totalitária.",
//         cover: "",
//         status: "LENDO",
//       },
//       {
//         id: "3",
//         title: "O Hobbit",
//         author: "J.R.R. Tolkien",
//         genre: "Fantasia",
//         year: 1937,
//         pages: 310,
//         rating: 4,
//         synopsis: "Aventura na Terra Média.",
//         cover: "",
//         status: "QUERO LER",
//       },
//       {
//         id: "4",
//         title: "Clean Code",
//         author: "Robert C. Martin",
//         genre: "Programação",
//         year: 2008,
//         pages: 464,
//         rating: 5,
//         synopsis: "Boas práticas de programação.",
//         cover: "",
//         status: "LIDO",
//       },
//       {
//         id: "5",
//         title: "O Pequeno Príncipe",
//         author: "Antoine de Saint-Exupéry",
//         genre: "Ficção",
//         year: 1943,
//         pages: 96,
//         rating: 5,
//         synopsis: "Reflexões sobre a vida.",
//         cover: "",
//         status: "LIDO",
//       },
//     ]);
//   }
// })();
