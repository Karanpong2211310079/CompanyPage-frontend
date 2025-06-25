import { Routes } from '@angular/router';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'admin',
        component: DashboardComponent
    }

];
