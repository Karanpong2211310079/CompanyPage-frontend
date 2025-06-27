import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  role?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'http://localhost:8000/user/login/';
  private tokenKey = 'access_token';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }).pipe(
      tap((res: any) => {
        if (res.access) {
          console.log('✅ ได้รับ Token:', res.access);
          this.cookieService.set(this.tokenKey, res.access, {
            path: '/',
            secure: true,
            sameSite: 'Lax',
            expires: new Date(Date.now() + 60 * 60 * 1000) // 1 ชั่วโมง
          });
          if (res.role) {
            this.cookieService.set('user_role', res.role, {
              path: '/',
              secure: true,
              sameSite: 'Lax',
              expires: new Date(Date.now() + 60 * 60 * 1000)
            });
            console.log('🔐 ได้รับ Role:', res.role);
          }
        } else {
          console.warn('❌ ไม่พบ access token ใน response');
        }
      })
    );
  }

  getToken(): string {
    const token = this.cookieService.get(this.tokenKey);
    console.log('🔐 Token ที่อ่านจาก Cookie:', token);
    return token;
  }

  decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) {
      console.warn('❌ ไม่มี token สำหรับ decode');
      return null;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('🧩 Decode Token Payload:', decoded);
      return decoded;
    } catch (e) {
      console.error('❌ Decode token error:', e);
      return null;
    }
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) {
      console.warn('❌ ไม่มี token');
      return true;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      const expired = decoded.exp < now;
      console.log('🧠 JWT Decode:', decoded);
      console.log(`⏳ Token หมดอายุหรือยัง: ${expired ? '✅ หมดอายุ' : '❌ ยังใช้ได้อยู่'}`);
      return expired;
    } catch (e) {
      console.error('❌ ไม่สามารถ decode token:', e);
      return true;
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const result = !!token && !this.isTokenExpired(token);
    console.log('👤 สถานะ login:', result ? '✅ เข้าระบบอยู่' : '❌ ไม่ได้เข้าสู่ระบบ');
    return result;
  }

  logout(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.cookieService.delete('user_role', '/');
    console.log('👋 ออกจากระบบแล้ว (token และ role ถูกลบ)');
  }

  getUserRole(): string | null {
    const decoded = this.decodeToken();
    if (decoded?.role) {
      console.log('🔐 Role จาก Token:', decoded.role);
      return decoded.role;
    }
    const roleFromCookie = this.cookieService.get('user_role');
    console.log('🔐 Role จาก Cookie:', roleFromCookie);
    return roleFromCookie || null;
  }
}
