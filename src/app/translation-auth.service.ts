import { Injectable } from '@angular/core';
import {DataStorageService} from "./data-storage.service";
import {UserService} from "./user.service";

@Injectable()
export class TranslationAuthService {

  maxTryNumber: number = 3;

  private runnedTranslationKey: string = "runnedTranslationKey";

  constructor(private dataStorageService: DataStorageService,
              private userService: UserService) { }

  noRegisteredUserCanTranslate() {
    const runnedTranslationNum = this.dataStorageService.loadData(this.runnedTranslationKey);
    console.log("runnedTranslationNum", runnedTranslationNum);
    if (!runnedTranslationNum) {
      return true;
    } else {
      return runnedTranslationNum < this.maxTryNumber;
    }
  }

  checkCanRunTranslate() : boolean {
    return this.userService.isUserLoggedIn() || this.noRegisteredUserCanTranslate();
  }
}
