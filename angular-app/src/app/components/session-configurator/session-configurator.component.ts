import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';

import { SessionService } from 'src/app/services/session.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-session-configurator',
  templateUrl: './session-configurator.component.html',
  styleUrls: ['./session-configurator.component.scss']
})
export class SessionConfiguratorComponent implements OnInit {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  attendees: string[] = [];
  timeInterval = 5;

  @ViewChild('attendeesScrollbar') attendeesScrollbar!: PerfectScrollbarComponent;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.attendees.push(value);
      this.attendeesScrollbar.directiveRef?.scrollToBottom();
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(attendee: string): void {
    const index = this.attendees.indexOf(attendee);

    if (index >= 0) {
      this.attendees.splice(index, 1);
    }
  }

  startSession = () => {
    this.sessionService.startSession();
  }

  sessionCanStart = () => this.attendees.length > 1;

}
