import { Component, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';

import { Meme } from '../meme.model';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
    selector: 'app-meme-list',
    templateUrl: './meme-list.component.html',
    styleUrls: ['./meme-list.component.css']
})

export class MemeListComponent implements AfterViewInit {
    public memes: Observable<any[]>;
    private memeCounter = 0;
    private list: any;
    private url: any;
    private ref: AngularFireStorageReference;

    constructor(private storageRef: AngularFireStorage, private db: AngularFireDatabase) {
        this.memes = db.list('/memes').valueChanges();
        this.list = db.list('/memes');
    }

    ngAfterViewInit() {
        this.ref = this.storageRef.ref('meme/');
        for(let i = 0; i < 1; i++) {
            this.url = this.ref.child(`pau-luna.jpg`);
            console.log(this.url);
            const img = document.getElementById(`${this.list[i]}.title`) as HTMLImageElement;
            console.log(img);
        }
    }

    addMeme(): void {
        this.list.push({id: this.memeCounter++, title: `This is the ${this.memeCounter}`});
    }
}
