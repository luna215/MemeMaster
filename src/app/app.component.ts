import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

class Book {
    constructor(public title) { }
}

@Component({
    selector: 'app-root',
    template: `
        <ul>
            <li *ngFor="let book of books | async">
                <pre>{{ book.title | json }}</pre>
            </li>
        </ul>
        <button (click)="addBook()">Add a book!</button>
    `
})
export class AppComponent {
    public books: Observable<any[]>;
    private bookCounter = 0;
    private list: any;

    constructor(db: AngularFireDatabase) {
        this.books = db.list('/books').valueChanges();
        this.list = db.list('/books')
    }

    addBook(): void {
      let newBook = new Book(`My book #${this.bookCounter++}`);
      this.list.push(newBook);
    }
}