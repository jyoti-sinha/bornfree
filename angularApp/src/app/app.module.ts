import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { HeaderComponent } from './header/header.component';

import { StoreModule } from '@ngrx/store';
import { loginReducer } from './state-strore/login.reducer';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({logState:loginReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
