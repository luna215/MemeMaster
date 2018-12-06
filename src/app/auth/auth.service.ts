import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({ providedIn: 'root'})

export class AuthService {

  successful: boolean;
  constructor(private firebase: AngularFireAuth, private router: Router) { }


  createUser(email, password) {

    this.firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => { this.router.navigate([''])})
        .catch(() => { alert('Uh oh! There was an issue. Try again.') });
  }

  login(email, password) {
     this.firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => { this.router.navigate(['']) })
        .catch(() => { alert('Uh oh! We couldn\'t find an account with those credentials.') });
    

  }

  logout() { 
   this.firebase.auth
          .signOut()
          .then(() => { this.router.navigate(['/login'])})
          .catch(() => { alert('We had trouble signing you out. Therefor, you can never leave us! :)')});
  }
}
