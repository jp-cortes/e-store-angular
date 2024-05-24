import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

@Component({
    selector:'app-layout'
})
class LayoutComponent {}

@Component({
    selector:'app-sign-in'
})
class SignInComponent {}

@Component({
    selector:'app-sign-up'
})
class SignUpComponent {}

@Component({
    selector:'app-password-recovery'
})
class PasswordRecoveryComponent {}

@Component({
    selector:'app-reset-password'
})
class ResetPasswordComponent {}

@Component({
    selector: 'app-not-found'
})
class NotFoundComponent {}

const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
    //   children: [
  
    //     {
    //       path: '',
    //       loadComponent: () => import('@products/pages/list/list.component'),
    //     },
    //     {
    //       path: 'about',
    //       loadComponent: () => import('@info/pages/about/about.component'),
    //     },
    //     {
    //       path: 'product/:id',
    //       loadComponent: () => import ('@info/pages/product-details/product-details.component'),
    //     },
    //     {
    //       path: 'my-account',
    //       canActivate: [authGuard],
    //       loadComponent: () => import('@info/pages/my-account/my-account.component')
    //     },
    //     {
    //       path: 'my-invoice',
    //       canActivate: [authGuard],
    //       loadComponent: () => import('@info/pages/my-invoice/my-invoice.component')
    //     },
    //     {
    //       path: 'checkout',
    //       canActivate: [authGuard],
    //       canDeactivate: [exitGuard],
    //       loadComponent: () => import('@info/pages/checkout/checkout.component')
    //     },
    //   ]
    },
    {
      path: 'sign-in',
      component: SignInComponent,
    },
    {
      path: 'sign-up',
      component: SignUpComponent,
    },
    {
      path: 'password-recovery',
      component: PasswordRecoveryComponent,
    },
    {
      path: 'reset-password',
      component: ResetPasswordComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ];
  

describe('Integration test', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let router: Router

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ AppComponent, RouterTestingModule.withRoutes(routes) ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    });

    beforeEach( fakeAsync(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // providers
        router = TestBed.inject(Router);

        router.initialNavigation();
        tick(); // wait while nav...
        fixture.detectChanges();
    }));

    it('Should Create the component', () => {
        expect(component).toBeDefined();
    });
    
});