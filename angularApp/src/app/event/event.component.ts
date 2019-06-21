import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


@Component({
  selector: 'event-app',
  template: `<form>
  <p><small *ngIf="!(logState | async)">Logged in as {{user.email}}</small></p>
    <h3>Events</h3>
    
    <p>
      <label for="name">
        <input type="text" id="name" placeholder="event name" name="name" [(ngModel)]="event.name" required>
      </label>
    </p>
    <p>
      <label for="date">
        <input type="date" id="date" placeholder="event date" name="date" [(ngModel)]="event.date" required>
      </label>
    </p>
    <p>
      <label for="description">
        <textarea type="test" id="description" placeholder="user password" name="description" [(ngModel)]="event.description" required></textarea>
      </label>
    </p>
    <button (click)="submit()" *ngIf="!updateButton">Save</button>
    <button (click)="update()" *ngIf="updateButton">Update</button>
    <button (click)="cancel()" *ngIf="updateButton">Cancel</button>
  </form>
  
  <ul>
    <li *ngFor="let item of allEvents">
      <h4>{{item.name}}</h4>
      <p>{{item.description}}</p>
      <small>{{item.date}}</small>
      <br>
      <button (click)="editEvent(item)">Edit</button>
      <button (click)="deleteEvent(item._id)">Delete</button>
    </li>
  </ul>
  `
})
export class EventComponent {
  event = {};
  updateButton:boolean = false;
  allEvents: Array<any> = [];
  user = {
    email: sessionStorage.getItem('email')
  }
  constructor(private http: HttpClient){
    this.getAllEvents();
  }

  getAllEvents() {
    this.http.get<any>('http://localhost:3000/api/events/',{
      headers: new HttpHeaders({
        'Authorization': sessionStorage.getItem('token')
      })
    }).subscribe(res => {  
      console.log(res)
      this.allEvents = res; 
    })
  }

  editEvent(item) {
    this.event = item;
    this.updateButton = true;
  }

  cancel() {
    this.event = {};
    this.updateButton = false;
  }

  submit() {
    if(Object.keys(this.event).length > 0){
        //console.log(this.register)
        this.http.post<any>('http://localhost:3000/api/addevent/', this.event, {
          headers: new HttpHeaders({
            'Authorization': sessionStorage.getItem('token')
          })
        }).subscribe(res => { 
          if(res.status == 200){
            this.event = {};
            this.allEvents.push({
              name: res.event.name,
              description: res.event.description,
              date: res.event.date,
            })
          }else{            
            alert('Error :(');
          }
        })
    }
    
  }

  update() {
    if(Object.keys(this.event).length > 0){
        //console.log(this.register)
        this.http.put<any>('http://localhost:3000/api/updateevent/', this.event, {
          headers: new HttpHeaders({
            'Authorization': sessionStorage.getItem('token')
          })
        }).subscribe(res => { 
          if(res.status == 200){
            this.event = {};
            this.cancel();
            this.getAllEvents();
          }else{            
            alert('Error :(');
          }
        })
    }        
  }

  deleteEvent(id:number) {
      if(confirm("Are you sure?")){
          let options = {
              headers: new HttpHeaders({
                'Authorization': sessionStorage.getItem('token')
              }),
              body: {
                "_id" : id
              }
          };
          this.http.delete<any>('http://localhost:3000/api/deleteevent/', options).subscribe(res => { 
            if(res.status == 200){
              this.getAllEvents();
            }else{            
              alert('Error :(');
            }
          })
      }
        
           
  }


}
