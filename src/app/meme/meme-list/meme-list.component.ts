import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { Meme } from '../meme.model';

@Component({
    selector: 'app-meme-list',
    templateUrl: './meme-list.component.html',
    styleUrls: ['./meme-list.component.css']
})

export class MemeListComponent {
    public memes: Observable<any[]>;
    private memeCounter = 0;
    private list: any;

    constructor(db: AngularFireDatabase) {
        this.memes = db.list('/memes').valueChanges();
        this.list = db.list('/memes');
    }

    addMeme(): void {
        this.list.push({id: this.memeCounter++, title: `This is the ${this.memeCounter}`});
    }
}