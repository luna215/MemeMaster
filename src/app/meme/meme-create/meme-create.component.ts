import { Component, OnInit } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-meme-create',
    templateUrl: './meme-create.component.html',
    styleUrls: ['./meme-create.component.css']
})

export class MemeCreateComponent implements OnInit {
    reader = new FileReader();
    userText = {
        'title': '',
        'topText': '',
        'bottomText': '',
        'url': '',
    };
    isLoading = true;
    ref: any;
    imgFile: any;
    result: any;
    private userId;
    private userMemeRef: any;
    private mode = 'create';

    constructor(private storageRef: AngularFireStorage,
                private db: AngularFireDatabase,
                private auth: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private http: Http,
                ) {
        this.userId = this.auth.getUserId();
        this.userMemeRef = db.database.ref(`${this.userId}`).child(`memesData`);

    }

    ngOnInit() {
      this.route
          .paramMap.subscribe((paramMap: ParamMap) => {
            this.isLoading = true;
            if (paramMap.has('memeTitle')) {
              this.mode = 'edit';
              this.userText['title'] = paramMap.get('memeTitle');
              this.db.list(`${this.userId}/memesData/${this.userText['title']}`).valueChanges().subscribe(data => {
                  this.userText['topText'] = data[4] as string ;
                  this.userText['bottomText'] = data[0] as string;
                  this.ref =  this.storageRef.storage.ref(`${data[2]}`).getDownloadURL().then(url => {
                    this.http.get('https://cors-anywhere.herokuapp.com/' + url, {
                      responseType: ResponseContentType.Blob,
                    }).toPromise()
                      .then((res: any) => {
                        this.imgFile = new Blob([res._body], {
                          type: res.headers.get('Content-Type')
                        });
                        this.imgFile.name = `${this.userText['title']}`;
                      }).then(() => {
                          this.getUserInput();
                        }
                      );
                  });
              });
            }
          });
    }

    public renderImage(event): void {
        this.isLoading = true;
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
        this.isLoading = false;
    }

    public renderFromUrl(event?): void {
      this.isLoading = true;
      this.http.get('https://cors-anywhere.herokuapp.com/' + event.target.value, {
          responseType: ResponseContentType.Blob,
      }).toPromise()
        .then((res: any) => {
          this.imgFile = new Blob([res._body], {
            type: res.headers.get('Content-Type')
          });
          this.imgFile.name = `${this.userText['title']}`;
        }).then(() => {
            this.getUserInput();
            this.isLoading = false;
        })
        .catch((err) => {
          if (err) {
            alert('That is not a proper url.');
          }
        });
    }

    public getUserInput(event?): void {
        if (!this.imgFile) { return; }
        if (event) {
          this.userText[event.target.name] = event.target.value;
        }
        this.isLoading = true;
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
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 8;
                    ctx.fillStyle = 'white';
                    ctx.fillText(userText['topText'], 100, 50);
                    ctx.fillText(userText['bottomText'], 100, 400);
                };
                console.log(e.target['result']);
                image.src = e.target['result'];
            };
        })(this.userText);
        reader.readAsDataURL(this.imgFile);
        this.isLoading = false;
    }

    uploadImage():  void {
        if (!this.imgFile || this.userText['title'] === '') {
          alert('You must upload an image and give it a title.');
          return;
        }
        console.log('saving image...');
        this.userText['title'] = this.userText['title'].toLocaleLowerCase().replace(/\s/g, '-');
        const memeData = {
            bottomText: this.userText['bottomText'],
            refToMeme: `${this.userId}/meme/${this.userText['title']}.jpg`,
            refToOriginal: `${this.userId}/original/${this.imgFile.name}`,
            title: this.userText['title'],
            topText: this.userText['topText'],
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
