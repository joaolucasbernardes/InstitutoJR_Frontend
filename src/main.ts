import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { routes } from './app/app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import localePt from '@angular/common/locales/pt';

import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';

// Registra os dados de localização do português do Brasil
registerLocaleData(localePt);

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Importa o módulo HTTP
    provideHttpClient(), // Provider HTTP
    provideRouter(routes), // Configuração de rotas
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Define o locale como 'pt-BR'
  ],
})
  .catch((err) => console.error(err));

// Registra elementos do Swiper
registerSwiperElements();
