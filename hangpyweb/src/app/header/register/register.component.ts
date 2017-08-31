import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() showRegister: boolean;
  @Output() showRegisterChange = new EventEmitter<boolean>();

  constructor() {
    console.log(this.showRegister);
  }

  ngOnInit() {
  }

  closeRegister(){ /* Close the login box */
    this.showRegister = !this.showRegister;
    this.showRegisterChange.emit(this.showRegister);
  }

  onKeyUp(){ /* When the user press enter a check if the telephonenumber is correct shall be made and then move on in the login process*/
    console.log("enter was pressed!");
  }
}
