import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from '@app/components/app/app.component';
import { HomeComponent } from '@app/components/home/home.component';
import { HttpService } from '@app/services/http.service';
import { AuthGuard } from '@app/services/auth.guard';
import { NavMenuComponent } from '@app/components/navmenu/navmenu.component';
import { CounterComponent } from '@app/components/counter/counter.component';
import { FetchDataComponent } from '@app/components/fetchdata/fetchdata.component';
import { CallbackComponent } from "@app/components/Callback/callback.component";
import { TokenInterceptor } from "@app/services/token.interceptor";

@NgModule({
    declarations: [

        AppComponent,
        CallbackComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent

    ],
    imports: [
        HttpClientModule,
        OAuthModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: CallbackComponent, pathMatch: 'full' },
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },
            { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: '' }
        ])
    ],
    providers: [
        HttpService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ]
})
export class AppModuleShared {
}

