import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { TranslateComponent } from './translate/translate.component';
import {TextTranslateService} from "./text-translate.service";
import {CommondDataLoadTranslatorService} from "./commond-data-load-translator.service";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatorRoutes} from "./translator-routes";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {HeaderComponent} from "../header/header.component";
import {UserService} from "../user.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    TranslateComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslatorRoutes,
        MatFormFieldModule,
        MatCardModule,
        MatAutocompleteModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        NgOptimizedImage
    ],
  providers: [TextTranslateService, CommondDataLoadTranslatorService, UserService],
  exports: [TranslateComponent, HeaderComponent]
})
export class TranslatorModule { }
