import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatCardModule,
         MatToolbarModule,
         MatButtonModule,
         MatFormFieldModule,
         MatProgressSpinnerModule,
        } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { MemeListComponent } from './meme/meme-list/meme-list.component';
import { MemeCreateComponent } from './meme/meme-create/meme-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ReplaceDashes } from './app.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MemeListComponent,
    MemeCreateComponent,
    SignupComponent,
    LoginComponent,
    ReplaceDashes,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'meme-master'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
