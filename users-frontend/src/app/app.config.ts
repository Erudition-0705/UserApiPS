// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// // import { provideRouter } from '@angular/router';

// // import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
// };


// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { routes } from './app.routes';
// import { UserListComponent } from './user-list/user-list.component';
// import { UserDetailsComponent } from './user-details/user-details.component';

// bootstrapApplication(UserListComponent, {
//   providers: [
//     provideRouter(routes),
//     HttpClientModule,
//   ],
// }).catch((err) => console.error(err));



import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';;




export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
  ],
};




