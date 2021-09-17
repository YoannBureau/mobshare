import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionConfiguratorComponent } from './session-configurator.component';

describe('SessionConfiguratorComponent', () => {
  let component: SessionConfiguratorComponent;
  let fixture: ComponentFixture<SessionConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionConfiguratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be possible to start the session if no attendee is specified', () => {
    // Arrange
    component.attendees = [];

    // Act
    const actual = component.sessionCanStart();

    // Assert
    expect(actual).toBeFalsy();
  });

  it('should not be possible to start the session if only one attendee is specified', () => {
    // Arrange
    component.attendees = ['John'];

    // Act
    const actual = component.sessionCanStart();

    // Assert
    expect(actual).toBeFalsy();
  });

  it('should be possible to start the session if at least 2 attendees are specified', () => {
    // Arrange
    component.attendees = ['John', 'Jane'];

    // Act
    const actual = component.sessionCanStart();

    // Assert
    expect(actual).toBeTruthy();
  });
});
