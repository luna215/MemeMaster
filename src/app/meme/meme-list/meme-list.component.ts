import { Component, AfterViewInit} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

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
    private userId;

    constructor(private storage: AngularFireStorage,
                private db: AngularFireDatabase,
                private auth: AuthService) {
        this.userId = this.auth.getUserId();
        this.memes = db.list(`${this.userId}/memesData`).valueChanges();
        this.list = db.list('/memes');
        this.storageRef = storage.storage.ref();
    }

    ngAfterViewInit() {
      this.db.list(`${this.userId}/memesData`).valueChanges().subscribe(memes => {
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
