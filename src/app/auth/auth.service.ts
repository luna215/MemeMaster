import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({ providedIn: 'root'})

export class AuthService {

  constructor(private firebase: AngularFireAuth) { }


  createUser(email, password) {
    this.firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then(function() { console.log('Successfull!'); })
        .catch(function() { console.log('There was an error'); });
  }

  login(email, password) {
    this.firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(function() { console.log('redirecting you now...'); })
        .catch(function() { console.log(`Couldn't find a profile with those credentials`); });
  }
}
