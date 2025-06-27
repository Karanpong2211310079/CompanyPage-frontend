import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './features/auth/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];  // อ่าน role จาก route config
    const userRole = this.loginService.getUserRole(); // อ่าน role จาก token

    console.log('🔐 Expected Role:', expectedRole);
    console.log('👤 User Role:', userRole);
    console.log('🔑 Logged in:', this.loginService.isLoggedIn());

    // ถ้าไม่มีการระบุ role ไว้ใน route ให้ผ่านได้เลย (อาจเป็นหน้า public)
    if (!expectedRole) {
      return true;
    }

    if (this.loginService.isLoggedIn() && userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/login']); // ถ้าไม่มีสิทธิ์ redirect ไปหน้า login
      return false;
    }
  }
}
