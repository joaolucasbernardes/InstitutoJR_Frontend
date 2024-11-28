import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToTopComponent } from '../to-top/to-top.component';
import { ScrollToTopService } from '../../services/scroll-to-top.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, RouterOutlet, RouterLink, ToTopComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imagemPath = 'src/assets/logo.png';

  constructor(private scrollService: ScrollToTopService) {}

  ngOnInit() {
    this.scrollService.initialize();
  }
}
