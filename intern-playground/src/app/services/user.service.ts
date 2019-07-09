import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [
    new User("James Hatfield", 1, "Some text homie"),
    new User("Jack Hatfield", 2, "Some text homie"),
    new User("Mickey Hatfield", 3, "Some text homie"),
    new User("Harry Hatfield", 4, "Some text homie")
  ];
  displayForm: boolean = false;
  displayStateChanged: Subject<boolean> = new Subject<boolean>();
  usersUpdated: Subject<User[]> = new Subject<User[]>();

  constructor() { }

  getUsers() {
    return this.users.slice();
  }

  addUser(newUser: User) {
    this.users.push(newUser);
    this.usersUpdated.next(this.users);
    this.showForm();
  }

  showForm() {
    this.displayForm = !this.displayForm;
    this.displayStateChanged.next(this.displayForm);
  }
}
