import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './frontend/app.config';
import { AppComponent } from './frontend/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
