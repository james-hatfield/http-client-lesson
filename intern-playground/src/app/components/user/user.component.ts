import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Output() clicked: EventEmitter<User> = new EventEmitter<User>();
  constructor() { }

  ngOnInit() {
  }

  onUserClicked() {
    this.clicked.emit(this.user);
  }
}
