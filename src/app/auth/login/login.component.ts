import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private auth: AuthService) {}

  loginUser(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];

    this.auth.login(email, password);
  }
}
