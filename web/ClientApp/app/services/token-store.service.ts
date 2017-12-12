import { Injectable, Inject } from '@angular/core';
import { OAuthStorage } from "angular-oauth2-oidc";

@Injectable()
export class BrowserTokenStoreService implements OAuthStorage {

    getItem(key: string): string {
        return this.readCookie(key);
    }

    removeItem(key: string): void {
        this.removeCookie(key);
    }

    setItem(key: string, data: string): void {
        this.writeCookie(key, data);
    }

    readCookie(name: string) {
        var result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
        return result ? result[1] : null;
    }

    writeCookie(name: string, value: string, days?: number) {
        if (!days) {
            days = 365 * 20;
        }

        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        var expires = "; expires=" + date.toUTCString();

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    removeCookie(name: string) {
        this.writeCookie(name, "", -1);
    }
}

@Injectable()
export class ServerTokenStoreService implements OAuthStorage {
    private cookies: Map<string, string>;
    constructor( @Inject('cookies') c: any, ) {
        let cookies = JSON.parse(c);
        this.cookies = new Map<string, string>();

        for (let cookie of cookies) {
            this.cookies.set(cookie.key, cookie.value);
        }
    }

    getItem(key: string): string {
        if (this.cookies) {
            return this.cookies.get(key);
        }

        return '';
    }

    removeItem(key: string): void { }

    setItem(key: string, data: string): void { }
}
