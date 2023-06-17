import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Books } from "./books.interface";

export const selectBooks = createFeatureSelector<Books[]>('mybooks');


export const selectBookById = (bookId: number) =>
  createSelector(selectBooks, (books: Books[]) => {
    let bookbyId = books.filter((_) => _.id == bookId);
    if (bookbyId.length == 0) {
      return null;
    }
    return bookbyId[0];
  });
