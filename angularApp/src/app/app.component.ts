import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  seats: Array<any> = [];
  female_seats: Array<number> = [5, 6, 7, 8, 17, 18, 19, 20];

  constructor(){
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
    console.log(this.seats)
  }
}
