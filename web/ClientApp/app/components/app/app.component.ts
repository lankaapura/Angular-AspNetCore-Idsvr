import { Component, PLATFORM_ID, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
    OAuthService,
    AuthConfig,
    JwksValidationHandler
} from "angular-oauth2-oidc";
import { isPlatformBrowser } from "@angular/common";

 export const authConfig: AuthConfig = {
     // Url of the Identity Provider
     issuer: "https://demo.identityserver.io",
     requireHttps: true,

     // URL of the SPA to redirect the user to after login
     redirectUri: "http://localhost:2020/",

     // URL of the SPA to redirect the user after silent refresh
     silentRefreshRedirectUri: "http://localhost:2020/silent-refresh.html",
     // The SPA's id. The SPA is registerd with this id at the auth-server
     clientId: "implicit",

     // set the scope for the permissions the client should request
     // The first three are defined by OIDC. The 4th is a usecase-specific one
     scope: "openid profile email api",

     showDebugInformation: true,

     sessionChecksEnabled: true
 };

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        private oauthService: OAuthService
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.oauthService.configure(authConfig);
            this.oauthService.tokenValidationHandler = new JwksValidationHandler();
            this.oauthService.loadDiscoveryDocumentAndTryLogin();

            // Optional
            //this.oauthService.setupAutomaticSilentRefresh();

            this.oauthService.events.subscribe(e => {
                console.debug("oauth/oidc event", e);
            });

            this.oauthService.events
                .filter(e => e.type === "session_terminated")
                .subscribe(e => {
                    console.debug("Your session has been terminated!");
                });

            this.oauthService.events
                .filter(e => e.type === "token_received")
                .subscribe(e => {
                    // this.oauthService.loadUserProfile();
                });
        }
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {

            this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
                if (
                    !this.oauthService.hasValidIdToken() ||
                    !this.oauthService.hasValidAccessToken()
                ) {
                    this.oauthService.initImplicitFlow("some-state");
                }
            });
        }
    }
}
