import { Component } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    constructor(private oauthService: OAuthService) { }

    logoutHandler() {
        this.oauthService.logOut();
    }
}
