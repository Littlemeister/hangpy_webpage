import { Component, OnInit } from '@angular/core';
import { LoggedInService } from '../service/loggedin/logged-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoggedInService]
})
export class HeaderComponent implements OnInit {
  showHideLogin: boolean = false;
  showHideRegister: boolean = false;

  constructor(private LoggedInService:LoggedInService) { }

  ngOnInit() {
  }

  toggleChild($event){
    console.log(this.showHideLogin);
    this.showHideLogin = !this.showHideLogin;
    console.log(this.showHideLogin);
  }

  toggleRegister($event){
    console.log(this.showHideRegister);
    this.showHideRegister = !this.showHideRegister;
    console.log(this.showHideRegister);
  }

  loginStatus(){
    this.LoggedInService.logStatusChange();
  }


}
