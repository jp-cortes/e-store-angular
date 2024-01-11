import { Routes } from '@angular/router';
import { CheckoutComponent } from '@info/pages/checkout/checkout.component';
import { MyAccountComponent } from '@info/pages/my-account/my-account.component';
import { MyInvoiceComponent } from '@info/pages/my-invoice/my-invoice.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { PasswordRecoveryComponent } from '@info/pages/password-recovery/password-recovery.component';
import { ResetPasswordComponent } from '@info/pages/reset-password/reset-password.component';
import { SignInComponent } from '@info/pages/sign-in/sign-in.component';
import { SignUpComponent } from '@info/pages/sign-up/sign-up.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { exitGuard } from './guards/exit.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        loadComponent: () => import('@products/pages/list/list.component'),
      },
      {
        path: 'about',
        loadComponent: () => import('@info/pages/about/about.component'),
      },
      {
        path: 'product/:id',
        loadComponent: () => import ('@info/pages/product-details/product-details.component'),
      },
      {
        path: 'my-account',
        canActivate: [authGuard],
        component: MyAccountComponent,
      },
      {
        path: 'my-invoice',
        canActivate: [authGuard],
        component: MyInvoiceComponent,
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        canDeactivate: [exitGuard],
        component: CheckoutComponent,
      },
    ]
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
