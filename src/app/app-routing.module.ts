import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemeCreateComponent } from './meme/meme-create/meme-create.component';
import { MemeListComponent } from './meme/meme-list/meme-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGaurd } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: MemeListComponent, canActivate: [AuthGaurd]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create', component: MemeCreateComponent, canActivate: [AuthGaurd]},
  {path: 'edit/:memeTitle', component: MemeCreateComponent, canActivate: [AuthGaurd]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
