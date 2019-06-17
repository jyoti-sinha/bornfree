import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  seats: Array<any> = [];
  female_seats: Array<number> = [5, 6, 7, 8, 17, 18, 19, 20];

  constructor(private http: HttpClient){
    for(let i=0; i<24; i++){
      this.seats.push({
        _id: i,
        F_seat: false,
        booked: false
      });
    }
    this.seats.forEach((el, index) => {
      this.female_seats.forEach((item, i) => {
        if(index == item){
          el.F_seat = true; 
        }
      })
    })

    this.http.get<any>('http://localhost:3000/events/').subscribe(res => {
      console.log(res)
    })

    console.log(this.seats)
  }
}
