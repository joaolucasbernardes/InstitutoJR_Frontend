import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {

  constructor(private router: Router) {}

  initialize() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (event.url === '/como-doar') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (event.url === '/pf') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (event.url === '/pj') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }
}
