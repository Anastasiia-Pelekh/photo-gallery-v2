import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import {
  ScreenTrackingService,
  UserTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withDebugTracing()),
    provideHttpClient(),
    provideFirebaseApp(
      () => initializeApp(environment.firebaseConfig)), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore(),
      provideAnalytics(() => getAnalytics()),
      provideFunctions(() => getFunctions()),
      provideMessaging(() => getMessaging()),
      providePerformance(() => getPerformance()),
      provideStorage(() => getStorage()),
    ),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(BrowserAnimationsModule),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
};