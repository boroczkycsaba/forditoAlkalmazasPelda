import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DataStorageService} from "./data-storage.service";
import {HttpClientModule} from "@angular/common/http";
import {TranslationAuthService} from "./translation-auth.service";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [DataStorageService, TranslationAuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
