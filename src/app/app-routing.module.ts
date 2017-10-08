import { PageNotFoundComponent } from './page-not-found.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
imports: [
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
    ])
],
exports: [ RouterModule ]
})
export class AppRoutingModule { }