import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-to-top',
  standalone: true,
  imports: [],
  templateUrl: './to-top.component.html',
  styleUrl: './to-top.component.css'
})
export class ToTopComponent {

  private readonly SCROLL_THRESHOLD = 100;

  constructor(@Inject(DOCUMENT) private document: Document) {}


  @HostListener('window:scroll')
  onScroll(): void {
    const scrollY = window.scrollY;
    const button = document.querySelector('.to-top');

    if (scrollY > this.SCROLL_THRESHOLD) {
      button?.classList.add('show-scrollTop');
    } else {
      button?.classList.remove('show-scrollTop');
    }
  }

  scrollToTop(): void {
    this.document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }
}

