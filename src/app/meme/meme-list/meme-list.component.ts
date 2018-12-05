import { Component, AfterViewInit} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';

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
    private storageRef: any;

    constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {
        this.memes = db.list('/memes').valueChanges();
        this.list = db.list('/memes');
        this.storageRef = storage.storage.ref();
    }

    ngAfterViewInit() {
      this.db.list('/memes').valueChanges().subscribe(memes => {

        // tslint:disable-next-line:forin
        for (let i = 0; i < memes.length; i++) {
          this.storageRef.child(memes[i]['refToMeme']).getDownloadURL().then(function(url) {
            const img = document.getElementById(`${memes[i]['title']}`) as HTMLImageElement;
            img.src = url;
          });
        }
      });
    }

    addMeme(): void {

    }
}
