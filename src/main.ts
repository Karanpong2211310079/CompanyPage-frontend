import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MiddleInterceptor } from './app/middle.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MiddleInterceptor,
      multi: true,
    }
  ]
}).catch((err) => console.error(err));
