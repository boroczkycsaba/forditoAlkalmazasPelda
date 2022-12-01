import {Component, OnInit} from '@angular/core';
import {CommondDataLoadTranslatorService} from "../commond-data-load-translator.service";
import {map, Observable, pipe, startWith, tap} from "rxjs";
import {TextTranslateService} from "../text-translate.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Language} from "../../language";
import {Router} from "@angular/router";
import {UserService} from "../../user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  translatiorForm: FormGroup;

  originLanguageSelected: Array<Language> = [];
  originLanguageFilteredOptions: Observable<any[] | null | undefined>;
  originLanguages: Array<Language> = [];

  targetLanguageSelected: Array<Language> = [];
  targetLanguageFilteredOptions: Observable<any[] | null | undefined>;
  targetLanguages: Array<Language> = [];
  isRegisteredUser: boolean = false;
  isGlobalError: boolean = false;
  isTranslateTextInProgess: boolean = false;
  isAutomaticTextDetectionInProgess: boolean = false;
  constructor(private commondDataLoadTranslatorService: CommondDataLoadTranslatorService,
              private textTranslateService: TextTranslateService,
              private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar) {
    this.translatiorForm = new FormGroup({
      originLanguage: new FormControl('', Validators.required),
      targetLanguage: new FormControl('', Validators.required),
      textToTranslate: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      translatedText: new FormControl()
    });
    const soterdLanguages = this.commondDataLoadTranslatorService.loadLanguages();
    this.originLanguages = Object.create(soterdLanguages);
    this.targetLanguages = Object.create(soterdLanguages);

    this.originLanguageFilteredOptions = this.translatiorForm.controls['originLanguage'].valueChanges.pipe(
      startWith(''), map(value => this._originLanguageFilter(value || '')),
    );
    this.targetLanguageFilteredOptions = this.translatiorForm.controls['targetLanguage'].valueChanges.pipe(
      startWith(''),
      map(value => this._targetLanguageFilter(value || '')),
    );

    this.translatiorForm.controls['textToTranslate'].valueChanges.subscribe(
      value => {
        this.isAutomaticTextDetectionInProgess = true;
        this.textTranslateService.detectTextLanguage(value).subscribe((detecttedLanguage: any) => {
          if (detecttedLanguage && detecttedLanguage[0]) {
            this._originLanguageSelectByCode(detecttedLanguage[0].language);
          }
          this.isAutomaticTextDetectionInProgess = false;
        },
          (err:any) => {
            this.isAutomaticTextDetectionInProgess = false;
            console.error(err);
            this.openErrorMessage('Error, sorry the text language detection not work');
          });
      }
    );

    this.isRegisteredUser = this.userService.isUserLoggedIn();
  }

  ngOnInit(): void {
  }

  navigataToRegistration() {
    this.router.navigate(['/registration']);
  }

  displayOriginLangaugeFn(language?: any) {
    return this.displayLanguage(language);
  }

  displayTargetLangaugeFn(language?: any) {
    return this.displayLanguage(language);
  }

  private displayLanguage(language?: any): string {
    if (language && language.name)
      return language.name;
    if (language)
      return language;
    return '';
  }

  private _originLanguageFilter(nameParam: string): any[] | undefined {
    if (!nameParam)
      return undefined;

    const selectedLanguage = this.originLanguages.filter((language) => {
      return language.name.toLowerCase().includes(nameParam.toLowerCase());
    });
    this.originLanguageSelected = selectedLanguage;
    return selectedLanguage;
  }


  private _originLanguageSelectByCode(codeParam: string): void {
    if (!codeParam)
      return undefined;

    const selectedLanguage = this.originLanguages.filter((language) => {
      return language.code.toLowerCase().includes(codeParam);
    });
    this.originLanguageSelected = selectedLanguage;
    this.translatiorForm.patchValue({
      originLanguage: selectedLanguage[0].name
    });
  }

  private _targetLanguageFilter(nameParam: string): any[] | undefined {
    if (!nameParam)
      return undefined;

    const selectedLanguage = this.targetLanguages.filter((language) => {
      return language.name.toLowerCase().includes(nameParam.toLowerCase());
    });
    this.targetLanguageSelected = selectedLanguage;
    return selectedLanguage;
  }

  checkCanRunTranslate() {
    return this.textTranslateService.checkCanRunTranslate();
  }

  private openErrorMessage(errorMessage: string) {
    this.isGlobalError = true;
    const globalErrorSnack = this.snackBar.open(errorMessage, 'OK', {duration: 10000})
    globalErrorSnack.afterDismissed().subscribe(() => {
      this.isGlobalError = false;
    });
    globalErrorSnack.onAction().subscribe(() => {
      this.isGlobalError = false;
    });
  }

  translate() {
    if (this.checkCanRunTranslate()) {
      const originLanguageValue = this.translatiorForm.value.originLanguage;
      const targetLanguagesValue = this.translatiorForm.value.targetLanguage;
      const textToTranslateValue = this.translatiorForm.value.textToTranslate;

      if (originLanguageValue &&
        targetLanguagesValue &&
        textToTranslateValue) {
        this.translatiorForm.patchValue({
          translatedText: ''
        });
        this.isTranslateTextInProgess = true;
        this.translatiorForm.value.translatedText = '';
        this.textTranslateService.translateText(textToTranslateValue,
          this.originLanguageSelected[0].code,
          this.targetLanguageSelected[0].code).subscribe(
          (translatedTextObject: any) => {
            console.log(translatedTextObject);
            if (translatedTextObject && translatedTextObject.translatedText)
              this.translatiorForm.patchValue({
                translatedText: translatedTextObject.translatedText
              });
            this.textTranslateService.runnedTranslationProgramNum();
            this.isTranslateTextInProgess = false;
          },
          (err:any) => {
            this.isTranslateTextInProgess = false;
            console.error(err);
            this.openErrorMessage('Error, sorry translating the text not working');
          }
        );
      }
    } else {
      this.openErrorMessage('It is no longer possible to translate texts in the application. Please register!');
    }
  }

}
