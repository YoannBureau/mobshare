import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  private currentAttendeeIndex = 0;
  private remainingSeconds = 0;
  private audioNotification = new Audio();

  constructor(
    private sessionService: SessionService,
    private _snackBar: MatSnackBar
  ) {
    // TODO : Remove
    this.sessionService.setSession(["John", "Jane", "Jack", "Bernard"], false, 0.1);

    // Init audio notification
    this.audioNotification.src = "../../../assets/notification.mp3";
    this.audioNotification.load();
  }

  ngOnInit(): void {
    this.openSnackBar(`Give controls to ${this.currentDriver()}, then press \"Start\".`, "Start");
  }

  progressBarValue = () => 100 - ((this.remainingSeconds * 100) / (this.sessionService.intervals * 60));
  formatCyphers = (value: number) => value.toString().length === 1 ? `0${value}` : `${value}`;
  timerMinutes = () => Math.floor(this.remainingSeconds / 60);
  timerSeconds = () => this.remainingSeconds - this.timerMinutes() * 60;

  currentDriver = () => this.sessionService.attendees[this.currentAttendeeIndex];

  currentNavigator = () => this.sessionService.attendees[this.currentAttendeeIndex + 1];

  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(
      message,
      action,
      {
        verticalPosition: "top",
      }
    );

    snackBarRef.afterDismissed().subscribe(obs => {
      this.startTimer();
    });
  }

  startTimer = () => {
    this.remainingSeconds = this.sessionService.intervals * 60;

    const interval = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds === 0) {
        clearInterval(interval);
        this.setNextTimer();
      }
    }, 1000);
  }

  setNextTimer = () => {
    this.currentAttendeeIndex++;
    if (this.currentAttendeeIndex >= this.sessionService.attendees.length) {
      this.currentAttendeeIndex = 0;
    }

    this.openSnackBar(`${this.currentDriver()} becomes the driver, and ${this.currentNavigator()} the navigator.`, "Start");
    this.playNotificationSound();
  }

  playNotificationSound() {
    this.audioNotification.play();
  }

}
