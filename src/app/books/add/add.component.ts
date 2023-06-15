import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../store/books.interface';
import { invokeSaveNewBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  bookForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0,
  };

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  public save() {
    this.store.dispatch(invokeSaveNewBookAPI({ newBook: this.bookForm }));

    this.appStore.pipe(select(selectAppState)).subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
