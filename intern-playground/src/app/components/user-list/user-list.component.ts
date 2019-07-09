import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { User } from "src/app/models/user";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  displayForm: boolean = false;
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.userService.usersUpdated.subscribe(users =>{
      this.users = users;
    });
    this.userService.displayStateChanged.subscribe( state => {
      this.displayForm = state;
    });
  }

  onUserClicked(user: User) {
    console.log(user);
  }

  onAddUser() {
    this.userService.showForm();
  }
}
