import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({ providedIn: 'root'})

export class AuthService {

  successful: boolean;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userId;

  constructor(private firebase: AngularFireAuth, private router: Router) {
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in');
        this.userId = user.uid;
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
      } else {
        console.log('No user signed in.');
        this.authStatusListener.next(false);
        this.isAuthenticated = false;
      }
    });
   }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  createUser(email, password) {

    this.firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.firebase.auth.signInWithEmailAndPassword(email, password);
          this.authStatusListener.next(true);
          this.router.navigate(['']);
        })
        .catch(() => { alert('Uh oh! There was an issue. Try again.'); });
  }

  login(email, password) {
     this.firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.authStatusListener.next(true);
          this.router.navigate(['']) })
        .catch(() => { alert('Uh oh! We couldn\'t find an account with those credentials.') });


  }

  logout() {
   this.firebase.auth
          .signOut()
          .then(() => {
            this.authStatusListener.next(false);
            this.router.navigate(['/login'])})
          .catch(() => { alert('We had trouble signing you out. Therefor, you can never leave us! :)')});
  }

}
