import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemeCreateComponent } from './meme/meme-create/meme-create.component';
import { MemeListComponent } from './meme/meme-list/meme-list.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', component: MemeListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'create', component: MemeCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
