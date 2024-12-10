import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  images: string[] = []; // Array para armazenar URLs de imagens

  isLoading: boolean = true; 

  private apiUrl = `${environment.strapiBaseUrl}/carousel-de-fotos`;
  
  constructor(private router: Router) {}

  async getCarouselContent() {
    try {
      const response = await axios.get(this.apiUrl + '?populate=*');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conteúdo do Strapi:', error);
      throw error;
    }
  }

  async ngOnInit() {
    await this.loadContent();
  }

  async loadContent() {
    try {
      const response = await this.getCarouselContent();
      
      if (response && response.data && response.data.length > 0) {
        const data = response.data[0]; // Acessa o primeiro objeto da lista
        
        if (data.Image && data.Image.length > 0) { // Verifica se há imagens
          // Mapeia as URLs das imagens
          this.images = data.Image.map((img: any) => `${environment.apiEndpoint}${img.url}`);
        } else {
          console.error('Nenhuma imagem encontrada');
        }
      } else {
        console.error('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Strapi:', error);
      this.router.navigate(['/error']);
    } finally {
      this.isLoading = false;
    }
  }


  private initializeCarousel(): void {
    // Re-inicializa o carousel (caso o Bootstrap precise)
    const carouselElement = document.getElementById('carouselExampleAutoplaying');
    if (carouselElement) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        new bootstrap.Carousel(carouselElement, {
          interval: 2000,
          ride: 'carousel'
        });
      }
    }
  }
}
