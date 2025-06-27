import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const middleInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('access_token');

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Token หมดอายุ หรือ Unauthorized ให้ลบ token และ redirect ไปหน้า login
        cookieService.delete('access_token', '/');
        cookieService.delete('user_role', '/');
        router.navigate(['/login']);  // ปรับ path ให้ตรงกับ route หน้าล็อกอินของคุณ
      }
      return throwError(() => err);
    })
  );
};
