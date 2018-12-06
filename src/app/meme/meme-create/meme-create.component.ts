import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-meme-create',
    templateUrl: './meme-create.component.html',
    styleUrls: ['./meme-create.component.css']
})

export class MemeCreateComponent {
    reader = new FileReader();
    userText = {
        'title': '',
        'topText': '',
        'bottomText': ''
    };
    ref: AngularFireStorageReference;
    imgFile: any;
    memeTitle: string;
    result: any;
    private userId;
    private userMemeRef: any;

    constructor(private storageRef: AngularFireStorage,
                private db: AngularFireDatabase,
                private auth: AuthService,
                private router: Router) {
        this.userId = this.auth.getUserId();
        this.userMemeRef = db.database.ref(`${this.userId}`).child(`memesData`);
    }

    public renderImage(event): void {
        const reader = new FileReader();
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        reader.onload = function(e) {
            const image = new Image();
            image.onload = function() {
                ctx.drawImage(image, 0, 0, image.width, image.height,
                                    0, 0, canvas.width, canvas.height);
            };
            image.src = e.target['result'];
        };
        reader.readAsDataURL(event.target.files[0]);
        this.imgFile = event.target.files[0];
    }

    getUserInput(event): void {
        if (!this.imgFile) { return; }
        this.userText[event.target.name] = event.target.value;
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const reader = new FileReader();
        reader.onload = (function(userText) {
            return function(e) {
                const image = new Image();
                image.onload = function() {
                    ctx.drawImage(image, 0, 0, image.width, image.height,
                                    0, 0, canvas.width, canvas.height);
                    ctx.font = '24px serif';
                    ctx.fillText(userText['topText'], 100, 50);
                    ctx.fillText(userText['bottomText'], 100, 400);
                };
                image.src = e.target['result'];
            };
        })(this.userText);
        reader.readAsDataURL(this.imgFile);
    }

    uploadImage():  void {
        if (!this.imgFile || this.userText['title'] === '') {
          alert('Oops, you for got to set something.');
          return;
        }
        console.log('saving image...');
        this.userText['title'] = this.userText['title'].toLocaleLowerCase().replace(/\s/g, '-');
        const memeData = {
            title: this.userText['title'],
            topText: this.userText['topText'],
            bottomText: this.userText['bottomText'],
            refToMeme: `${this.userId}/meme/${this.userText['title']}.jpg`,
            refToOriginal: `${this.userId}/original/${this.imgFile.name}`,
        };
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.toBlob((blob) => {
          this.ref = this.storageRef.ref(`${this.userId}/meme/${this.userText['title']}.jpg`);
          this.ref.put(blob);
        }, 'image/jpeg', 0.95);
        this.storageRef.ref(`${this.userId}/original/${this.imgFile.name}`).put(this.imgFile);
        this.userMemeRef.child(`${this.userText['title']}`).set(memeData);
        this.router.navigate(['']);
    }
}
