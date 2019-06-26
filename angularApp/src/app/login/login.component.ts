import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as app from '../store/store.action';


@Component({
  selector: 'login-app',
  template: `<form>
    <h3>Sign In</h3>
    <p>
      <label for="email">
        <input type="email" id="email" placeholder="user email" name="email" [(ngModel)]="login.email" required>
      </label>
    </p>
    <p>
      <label for="pwd">
        <input type="password" id="pwd" placeholder="user password" name="password" [(ngModel)]="login.password" required>
      </label>
    </p>
    <button (click)="submit()">Submit</button>
  </form>`
})
export class LoginComponent implements OnInit{
  login = {};
  logState:Observable<boolean>;
  constructor(private http: HttpClient, private router:Router, private store: Store<any>){
    this.logState = store.pipe(select('logState'));
  }

  ngOnInit() {
    if(sessionStorage.getItem('token')){
      this.router.navigate(['events']);
    }else{
      this.router.navigate(['login']);
    }
  }

  submit() {
    if(Object.keys(this.login).length > 0){
        //console.log(this.login)
        this.http.post<any>('http://localhost:3000/login/', this.login, {
          headers: new HttpHeaders({
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json"
          }) 
        }).subscribe(res => { 
          if(res.status == 200){
            this.login = {};
            sessionStorage.setItem('userId', res.user._id);
            sessionStorage.setItem('email', res.user.email);
            sessionStorage.setItem('token', res.token);
            this.router.navigate(['events']);

            this.store.dispatch(new app.AppLogin(true));
            alert('Successfully logged in :)'); 
          }else{            
            alert('Login failed :('); 
          }
        })
    }
    
  }
}
