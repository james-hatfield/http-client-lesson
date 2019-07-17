import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.addUserForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, [Validators.required, Validators.min(10)])
    });
  }

  onSubmit(){
    let newUser = new User(this.addUserForm.value.name, null, this.addUserForm.value.description);
    this.userService.addUser(newUser);
  }

  onCancel(){
    this.userService.showForm()
  }
}
