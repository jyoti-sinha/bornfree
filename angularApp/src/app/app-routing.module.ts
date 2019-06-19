import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventComponent } from './event/event.component';


const routes:Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'events',
    component: EventComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    CommonModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}