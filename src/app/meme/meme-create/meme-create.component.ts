import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { timingSafeEqual } from 'crypto';
import { Reference } from '@angular/fire/storage/interfaces';

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
    constructor(private storageRef: AngularFireStorage) {}

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
        console.log(event.target.files[0]);
        reader.readAsDataURL(event.target.files[0]);
        this.imgFile = event.target.files[0];
    }

    getUserInput(event): void {
        this.userText[event.target.name] = event.target.value;
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        ctx.font = '24px serif';
        ctx.fillText(this.userText['topText'], 100, 50);
        ctx.fillText(this.userText['bottomText'], 100, 400);
    }

    uploadImage():  void {
        console.log('saving image...');
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        console.log(canvas.toBlob((blob) => {
          this.ref = this.storageRef.ref('catInOveralls.jpg');
          this.ref.put(blob);
        }));
    }
}
