import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { routes } from './app/app.routes'; // Verifique o caminho correto
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule,  // Adiciona HttpClientModule
    provideHttpClient(),  // Fornece o HttpClient
    provideRouter(routes) // Configura o roteamento com as rotas importadas
  ],
})
.catch((err) => console.error(err));

registerSwiperElements();
