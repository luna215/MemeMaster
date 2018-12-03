import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

class Book {
    constructor(public title) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
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