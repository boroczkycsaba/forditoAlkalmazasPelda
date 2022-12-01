import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {DataStorageService} from "../data-storage.service";
import {Language} from "../language";

@Injectable()
export class CommondDataLoadTranslatorService {

  private _baseUrl = `${environment.baseUrl}`;
  private langaugeSotereKey = 'langaugeSotereKey';
  private langaugeSotereKeyExpDateKey = this.langaugeSotereKey + "expirationDate";
  storedLanguages: Array<Language> = [];

  constructor(private http: HttpClient, private dataStorageService: DataStorageService) {
  }

  public listLanguages() {
    return this.http.get<any[]>(`${this._baseUrl}/languages`);
  }


  public loadLanguages(): Array<Language> {
    let expirationDateValue = this.dataStorageService.loadData(this.langaugeSotereKeyExpDateKey);
    if (!expirationDateValue) {
      const expirationDateValue = new Date();
      expirationDateValue.setHours(expirationDateValue.getHours() + 1);
      this.dataStorageService.storeData(this.langaugeSotereKeyExpDateKey, expirationDateValue);
    }
    const now = new Date();
    if (now < expirationDateValue) {
      return this.dataStorageService.loadData(this.langaugeSotereKey);
    } else {
      let languageObject;
      this.listLanguages().subscribe(languages => {
          languages.forEach(language => {
            languageObject = new Language(language.code, language.name);
            this.storedLanguages.push(languageObject);
          })
          this.dataStorageService.storeData(this.langaugeSotereKey, this.storedLanguages);
          return this.storedLanguages;
        }
      )
    }
    return this.storedLanguages;
  }
}
