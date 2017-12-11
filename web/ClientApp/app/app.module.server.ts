import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModuleShared } from './app.module.shared';
import { OAuthStorage } from "angular-oauth2-oidc";
import { AppComponent } from './components/app/app.component';
import { ServerTokenStoreService } from "@app/services/token-store.service";

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppModuleShared
    ],
    providers: [
        {
            provide: OAuthStorage,
            useClass: ServerTokenStoreService
        }
    ]
})
export class AppModule {
}
