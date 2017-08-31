import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})

export class LoginFormComponent implements OnInit {
  @Input() showLogin: boolean;
  @Output() showLoginChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  closeLogin(){ /* Close the login box */
    console.log(this.showLogin);
    this.showLogin = !this.showLogin;
    this.showLoginChange.emit(this.showLogin);
  }

  onKeyUp(){ /* When the user press enter a check if the telephonenumber is correct shall be made and then move on in the login process*/
    console.log("enter was pressed!");
  }
}
