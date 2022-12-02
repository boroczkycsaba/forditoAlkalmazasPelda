import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TextTranslateService} from "./text-translate.service";
import {TranslationAuthService} from "../translation-auth.service";

@Injectable({
  providedIn: 'root'
})
export class TranslatorGuard implements CanActivate {

  constructor(private translationAuthService: TranslationAuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.translationAuthService.checkCanRunTranslate()) {
      this.router.navigateByUrl('/registration');
    }
    return true;
  }

}
