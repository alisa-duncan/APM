import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html',
    animations: [ routerTransition ]
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';

    constructor(private authService: AuthService, private router: Router) { }

    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');
        console.log('Log out');
    }
}
