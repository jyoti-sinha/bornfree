import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'header-app',
  template: `<div class="text-right p-4">
      <div *ngIf="!loggedIn">
        <a routerLink="login" href="javascript:void(0)">Signin</a> / 
        <a routerLink="signup" href="javascript:void(0)">Register</a> 
      </div>
      <a href="javascript:void(0)" *ngIf="loggedIn" (click)="logout()">Logout</a>
       
    
    <hr>
  </div>`
})
export class HeaderComponent {
  loggedIn:boolean = false;
  constructor(private http: HttpClient, private router:Router){
    if(sessionStorage.getItem('token')){
      this.loggedIn = true;
    }
  }

  logout() {
    this.loggedIn = true;
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  
}
