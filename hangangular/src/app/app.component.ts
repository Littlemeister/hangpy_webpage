import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hangpy';
  myobject = {
    gender:'male',
    age:'27',
    location:'Sweden'
  };

  myArr = ["him", "me","some"];

  angularLogo = 'http://www.freepngimg.com/download/light/2-2-light-free-download-png.png'

  buttonStatus = true;
  buttonStatus2 = false;
  buttonStatus3 = 'hi';
}
