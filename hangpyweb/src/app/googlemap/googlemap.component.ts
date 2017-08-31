import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.scss']
})
export class GooglemapComponent implements OnInit {
  lat: number = 40.678418;
  lng: number = 16.809007;
  zoom: number = 10;
  mlat: number = 40.678418;
  mlng: number = 16.809007;

  constructor() { }

  ngOnInit() {
  }

  mapClicked($event:any){
    this.mlat = $event.coords.lat;
    this.mlng = $event.coords.lng;
  }
}
