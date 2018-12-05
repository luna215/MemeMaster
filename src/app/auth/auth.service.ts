import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({ providedIn: 'root'})

export class AuthService {

  successful: Promise<boolean>;
  constructor(private firebase: AngularFireAuth, private router: Router) { }


  createUser(email, password) {
    this.successful = this.firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then(function() { return true})
        .catch(function() { return false });
    if(!this.successful['i']){
      alert('Uh oh! There was an issue. Try again.')
      return;
    }
    this.router.navigate(['']);
  }

  login(email, password) {
    this.successful = this.firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(function() { return true; })
        .catch(function() { return false; });
    
    if(!this.successful['i']) {
      alert('Uh oh! We can\'t find an account with those credentials.' );
      return;
    }
    
    this.router.navigate(['']);
  }
}
