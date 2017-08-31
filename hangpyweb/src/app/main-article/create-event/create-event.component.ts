import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  showHideEventCreation: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleEventCreation($event){
    console.log(this.showHideEventCreation);
    this.showHideEventCreation = !this.showHideEventCreation;
    console.log(this.showHideEventCreation);
  }

}
