import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { bookReducer } from './store/books.reducer';
import { StoreModule } from '@ngrx/store';
import { BooksEffect } from './store/books.effect';
import { EffectsModule } from '@ngrx/effects';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BooksRoutingModule,
    StoreModule.forFeature('mybooks', bookReducer),
    EffectsModule.forFeature([BooksEffect])
  ]
})
export class BooksModule { }
