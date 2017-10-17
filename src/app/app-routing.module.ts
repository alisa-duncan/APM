import { AuthGuard } from './user/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
imports: [
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        {
            path: 'products',
            //canActivate: [ AuthGuard ],
            data: { preload: false, animation: 'product' },
            loadChildren: 'app/products/product.module#ProductModule'
        },
        { path: '', redirectTo: 'welcome', pathMatch: 'full', data: { animation: 'welcome' } },
        { path: '**', component: PageNotFoundComponent }
    ],
    { preloadingStrategy: PreloadAllModules })
],
exports: [ RouterModule ]
})
export class AppRoutingModule { }