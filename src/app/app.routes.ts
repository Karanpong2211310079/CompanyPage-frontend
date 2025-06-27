import { Routes } from '@angular/router';
import { DashboardComponent as AdminDashboardComponent } from './features/admin/dashboard/dashboard.component';
import { DashboardComponent as UserDashboardComponent } from './features/user/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
export const routes: Routes = [
  // หน้า public
  { path: 'login', component: LoginComponent },

  // หน้า admin
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },

  // หน้า user
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },

  // กำหนด default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 404 ถ้าไม่เจอหน้า
  { path: '**', redirectTo: '/login' }
];



