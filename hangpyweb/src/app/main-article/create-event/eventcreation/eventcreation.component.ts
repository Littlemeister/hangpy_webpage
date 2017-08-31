import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-eventcreation',
  templateUrl: './eventcreation.component.html',
  styleUrls: ['./eventcreation.component.scss']
})

export class EventcreationComponent implements OnInit {
  @Input() EventCreation: boolean;
  @Output() EventCreationChange = new EventEmitter<boolean>();
  step = 1;
  startdate: string = "2014-10-31";
  starttime: string = "22:22"

  constructor() {
  }

  ngOnInit() {
  }

  changeStep(stepvalue){ /* Changing the step for the creationscreen that the user*/
    console.log(this.step);
    this.step = stepvalue;
    console.log(this.step);
  }

  closeEventCreation(){ /* Close the login box */
    console.log(this.EventCreation);
    this.EventCreation = !this.EventCreation;
    this.step = 1;
    this.EventCreationChange.emit(this.EventCreation);
  }
}
