import { Injectable } from '@angular/core';
import {DataStorageService} from "./data-storage.service";
import {UserService} from "./user.service";

@Injectable()
export class TranslationAuthService {

  private runnedTranslationKey: string = "runnedTranslationKey";

  constructor(private dataStorageService: DataStorageService,
              private userService: UserService) { }

  noRegisteredUserCanTranslate() {
    const runnedTranslationNum = this.dataStorageService.loadData(this.runnedTranslationKey);
    if (!runnedTranslationNum) {
      return true;
    } else {
      return runnedTranslationNum < 4;
    }
  }

  checkCanRunTranslate() : boolean {
    return this.userService.isUserLoggedIn() || this.noRegisteredUserCanTranslate();
  }
}
