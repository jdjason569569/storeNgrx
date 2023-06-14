import { createFeatureSelector } from "@ngrx/store";
import { Books } from "./books.interface";

export const selectBooks = createFeatureSelector<Books[]>('mybooks');
