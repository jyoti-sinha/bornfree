import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Component({
  selector: 'register-app',
  template: `<form>
  <h3>Register</h3>
    <p>
      <label for="email">
        <input type="email" id="email" placeholder="user email" name="email" [(ngModel)]="register.email" required>
      </label>
    </p>
    <p>
      <label for="pwd">
        <input type="password" id="pwd" placeholder="user password" name="password" [(ngModel)]="register.password" required>
      </label>
    </p>
    <button (click)="submit()">Submit</button>
  </form>`
})
export class RegisterComponent {
  register = {};
  constructor(private http: HttpClient){
  }

  submit() {
    if(Object.keys(this.register).length > 0){
        //console.log(this.register)
        this.http.post<any>('http://localhost:3000/register/', this.register).subscribe(res => { 
          if(res.status == 200){
            this.register = {};
            alert('Successfully registered :)');
          }else{
            alert('Registeration failed :(');
          }
        })
    }
    
  }
}
