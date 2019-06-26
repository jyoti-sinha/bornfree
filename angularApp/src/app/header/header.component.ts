import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as app from '../store/store.action';

import { Store, select } from '@ngrx/store';


@Component({
  selector: 'header-app',
  template: `<div class="text-right p-4">
      
      <div *ngIf="!(logState | async)">
        <a routerLink="login" href="javascript:void(0)">Signin</a> / 
        <a routerLink="signup" href="javascript:void(0)">Register</a> 
      </div> 
      
      <a *ngIf="(logState | async)" href="javascript:void(0)" (click)="logout()">Logout</a>
      
    
    <hr>
  </div>` 
})
export class HeaderComponent {
  logState:Observable<boolean>;
  constructor(private http: HttpClient, private router:Router, private store: Store<any>){    
    this.logState = store.pipe(select('logState'));
  }

  logout() {
    this.store.dispatch(new app.AppLogin(false));
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  
}
