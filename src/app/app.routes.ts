import { Routes } from '@angular/router';
import { MyAccountComponent } from '@info/pages/my-account/my-account.component';
import { MyOrdersComponent } from '@info/pages/my-orders/my-orders.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { PasswordRecoveryComponent } from '@info/pages/password-recovery/password-recovery.component';
import { ResetPasswordComponent } from '@info/pages/reset-password/reset-password.component';
import { SignInComponent } from '@info/pages/sign-in/sign-in.component';
import { SignUpComponent } from '@info/pages/sign-up/sign-up.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

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
        component: MyAccountComponent,
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
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
