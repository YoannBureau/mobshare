import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private _snackBar: MatSnackBar
  ) {
    // TODO : Remove
    this.sessionService.setSession(["John", "Jane", "Jack", "Bernard"], true, 5);
  }

  ngOnInit(): void {
    this.openSnackBar("Give controls to John, then press \"Start\".", "Start");
  }

  progressBarValue = () => 77;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(
      message,
      action,
      {
        verticalPosition:"top",
      }
    );
  }

}
