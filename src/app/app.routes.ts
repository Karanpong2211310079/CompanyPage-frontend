import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    }

];
