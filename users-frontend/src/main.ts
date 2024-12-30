import { bootstrapApplication } from '@angular/platform-browser'; 
import { appConfig } from './app/app.config';  // Config for the browser
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
