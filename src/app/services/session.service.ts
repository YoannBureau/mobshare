import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public attendees = new Array<String>();
  public intervals = 5;
  public isSet = false;
 
  constructor() { }
  
  setSession(attendees:Array<String>, isRandomized:boolean, intervals:number) {
    this.attendees = attendees;
    this.intervals = intervals;

    if(isRandomized) {
      this.attendees = this.attendees.sort(() => Math.random() - 0.5);
    }

    this.isSet = true;
  }

  startTimer() {

  }

}
