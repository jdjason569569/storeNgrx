import { createReducer, on } from '@ngrx/store';
import { Books } from './books.interface';
import { booksFetchAPISuccess } from './books.action';

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  })
);
