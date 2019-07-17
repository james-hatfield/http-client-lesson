import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class UserService {
  users: User[] = [];

  displayForm: boolean = false;
  displayStateChanged: Subject<boolean> = new Subject<boolean>();
  usersUpdated: Subject<User[]> = new Subject<User[]>();

  constructor(private http: HttpClient) {
    this.getUsersFromDB();
  }

  getUsers() {
    return this.users.slice();
  }

  addUser(newUser: User) {
    this.addUserToDB(newUser);
    this.showForm();
  }

  showForm() {
    this.displayForm = !this.displayForm;
    this.displayStateChanged.next(this.displayForm);
  }

  private getUsersFromDB() {
    this.http.get<User[]>("http://localhost:3000/users").subscribe(users => {
      this.users = users;
      this.usersUpdated.next(this.users);
    });
  }

  private addUserToDB(newUser: User) {
    this.http
      .post<User>("http://localhost:3000/users/add", newUser)
      .pipe(
        map((user)=> {
          let newUser = new User(user.name, user._id, user.description);
          return newUser;
        })
      )
      .subscribe(newDbUser => {
        this.users.push(newDbUser);
        this.usersUpdated.next(this.users);
      });
  }

   deleteUser(id: string){
    this.http.delete('http://localhost:3000/users/' + id + '/delete').subscribe(data => {
      
    })
  }
}
