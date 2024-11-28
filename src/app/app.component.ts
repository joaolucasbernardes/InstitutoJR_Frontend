import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ComoDoarComponent } from './pages/como-doar/como-doar.component';
import { ToTopComponent } from './components/to-top/to-top.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      HomeComponent, 
      NavbarComponent,
      FooterComponent,
      ComoDoarComponent,
      ToTopComponent,
      FormsModule,
      HttpClientModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})


export class AppComponent {
  [x: string]: any;
  title = 'Instituto João Rodrigues';

  
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // DIRECIONADOR DE SEÇÃO
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });

  }

  jumpToSection(section: string | null) {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }


 

}
