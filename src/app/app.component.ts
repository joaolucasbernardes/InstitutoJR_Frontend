import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToTopComponent } from './components/to-top/to-top.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ToTopComponent,
    FormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements AfterViewInit {
  title = 'Instituto João Rodrigues';

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // DIRECIONADOR DE SEÇÃO
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  ngAfterViewInit() {
  }

  jumpToSection(section: string | null) {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}