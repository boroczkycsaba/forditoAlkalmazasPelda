import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {DataStorageService} from "../data-storage.service";
import {TranslationAuthService} from "../translation-auth.service";

@Injectable()
export class TextTranslateService {

  private _baseUrl = `${environment.baseUrl}`;
  private runnedTranslationKey: string = "runnedTranslationKey";

  constructor(private http: HttpClient,
              private dataStorageService: DataStorageService,
              private translationAuthService: TranslationAuthService) {
  }

  public translateText(textToTranslate: string,
                               originLanguage: string,
                               targetLanguage: string): any {
    var formData = new FormData();
    formData.append("q", textToTranslate);
    formData.append("source", originLanguage);
    formData.append("target", targetLanguage);
    formData.append("format", "text");
    return this.http.post(`${this._baseUrl}/translate`, formData);
  }


  public detectTextLanguage(textToLangDetect: string): any {
    var formData = new FormData();
    formData.append("q", textToLangDetect);
    formData.append("format", "text");
    return this.http.post(`${this._baseUrl}/detect`, formData);
  }


  runnedTranslationProgramNum() {
    let runnedTranslationNum = this.dataStorageService.loadData(this.runnedTranslationKey);
    if (!runnedTranslationNum) {
      this.dataStorageService.storeData(this.runnedTranslationKey, 1);
    } else {
      this.dataStorageService.storeData(this.runnedTranslationKey, ++runnedTranslationNum);
    }
  }

  checkCanRunTranslate() : boolean {
    return this.translationAuthService.checkCanRunTranslate();
  }
}
