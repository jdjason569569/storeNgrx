import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../store/books.interface';
import { switchMap } from 'rxjs';
import { selectBookById } from '../store/books.selector';
import { invokeUpdateBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  bookForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0,
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          var id = Number(params.get('id'));
          return this.store.pipe(select(selectBookById(id)));
        })
      )
      .subscribe((data) => {
        if (data) {
          this.bookForm = { ...data };
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  udapte() {
    this.store.dispatch(
      invokeUpdateBookAPI({ updateBook: { ...this.bookForm } })
    );

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
