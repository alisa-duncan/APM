import { MessageService } from './messages/message.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
} from '@angular/animations';


@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html',
    animations: [
        trigger('routerAnimation', [
            // This uses the same animation whether we are home => product or product => home
            transition('* <=> *', [
                // Initial state of new route
                query(':enter',
                style({
                    position: 'fixed',
                    width: '50%',
                    transform: 'translateX(-100%)'
                }),
                    { optional: true }),
                // move page off screen right on leave
                query(':leave',
                style({
                    position: 'fixed',
                    width: '50%',
                    transform: 'translateX(-200%)'
                })
                   ,
                    { optional: true }),
                // move page in screen from left to right
                query(':enter',
                    animate('500ms ease',
                        style({
                            opacity: 1,
                            transform: 'translateX(0%)'
                        })
                    ),
                    { optional: true }),
            ])
        ])
    ]
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    getRouteAnimation(outlet: any) {
        return outlet.activatedRouteData.animation
      }

    checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }
    }

    displayMessages(): void {
        this.router.navigate([{ outlets: { popup: ['messages'] } }]);
        this.messageService.isDisplayed = true;
    }

    hideMessages(): void {
        this.router.navigate([{ outlets: { popup: null } }]);
        this.messageService.isDisplayed = false;
    }

    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');
        console.log('Log out');
    }
}
