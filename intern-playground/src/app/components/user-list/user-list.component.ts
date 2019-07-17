import { Component, OnInit } from "@angular/core";
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

  constructor(private userService: UserService) {

  }

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
    this.userService.deleteUser(user._id);
  }

  onAddUser() {
    this.userService.showForm();
  }
}
