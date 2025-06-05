import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

registerLocaleData(localeEsCO);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()) // ⬅️ ESTO ES FUNDAMENTAL
  ]
}).catch(err => console.error(err));
