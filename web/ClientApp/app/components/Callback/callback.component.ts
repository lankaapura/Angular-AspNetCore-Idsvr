import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig } from "angular-oauth2-oidc";
import { Router } from "@angular/router";

@Component({
    template: ''
})
export class CallbackComponent implements OnInit {

    constructor(private oauthService: OAuthService, private router: Router) {}

    ngOnInit() {
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
                this.oauthService.initImplicitFlow('some-state');
            } else {
                this.router.navigate(["/home"]);
            }
        });
    }
}