import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-star-event',
  templateUrl: './create-star-event.component.html',
  styleUrls: ['./create-star-event.component.scss']
})
export class CreateStarEventComponent implements OnInit {
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
