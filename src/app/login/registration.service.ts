import { Injectable } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";

@Injectable()
export class RegistrationService {

  constructor(private userService:UserService) { }

  saveUser(user: User) {
    this.userService.saveUser(user);
  }
}
