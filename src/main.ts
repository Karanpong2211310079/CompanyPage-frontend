import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { middleInterceptor } from './app/middle.interceptor'; // แปลงเป็น function interceptor ตามตัวอย่างด้านล่าง

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(
      withInterceptors([middleInterceptor]) // ใส่เป็นฟังก์ชัน interceptor
    )
  ]
}).catch((err) => console.error(err));
