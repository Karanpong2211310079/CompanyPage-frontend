import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    if (this.loginform.valid) {
      const { username, password } = this.loginform.value;

      if (!username || !password) return;

      this.loginService.login(username, password).subscribe({
        next: (response) => {
          console.log('✅ Login success:', response);

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have logged in successfully!'
          }).then(() => {
            // 🔐 ดึง role จาก service หลัง login แล้ว
            const role = this.loginService.getUserRole();

            // 🛣️ นำทางไป dashboard ตาม role
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (role === 'user') {
              this.router.navigate(['/user']);
            } else {
              this.router.navigate(['/']); // กรณี role ไม่ถูกต้อง
            }
          });
        },
        error: (error: any) => {
          console.error('❌ Login failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
          });
        }
      });
    } else {
      this.loginform.markAllAsTouched();
    }
  }
}
