import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModuleShared } from './app.module.shared';
import { OAuthStorage } from "angular-oauth2-oidc";
import { AppComponent } from './components/app/app.component';
import { BrowserTokenStoreService } from "@app/services/token-store.service";

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModuleShared,
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        {
            provide: OAuthStorage,
            useClass: BrowserTokenStoreService
        }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}