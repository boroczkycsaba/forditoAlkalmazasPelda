import { Injectable } from '@angular/core';
import {DataStorageService} from "./data-storage.service";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDataKey: string = 'translatorUserData';
  constructor(private  dataStorageService:DataStorageService) { }

  saveUser(user:User) {
    this.dataStorageService.storeData(this.userDataKey, user);
  }

  loadUser() : User {
    const user = this.dataStorageService.loadData(this.userDataKey);
    if (user && user.name) {
      return  user;
    } else {
      return new User();
    }
  }

  isUserLoggedIn() : boolean {
    const userLoaded = this.loadUser();
    return userLoaded && userLoaded.name !== undefined;
  }
}
