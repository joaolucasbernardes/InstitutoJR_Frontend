import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  images: string[] = []; // Array para armazenar URLs de imagens

  private apiUrl = `${environment.strapiBaseUrl}/carousel-de-fotos`;
  
  constructor() {}

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
    console.log('Tentando carregar o conteúdo...');
    try {
      const response = await this.getCarouselContent();
      console.log('Resposta do Strapi:', response); // Log da resposta

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0]; // Acessa o primeiro objeto da lista
        
        if (data.Image && data.Image.length > 0) { // Verifica se há imagens
          // Mapeia as URLs das imagens
          this.images = data.Image.map((img: any) => `${environment.apiEndpoint}${img.url}`);
          console.log('URLs das imagens:', this.images); // Verifica as URLs geradas
        } else {
          console.error('Nenhuma imagem encontrada');
        }
      } else {
        console.error('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Strapi:', error);
    }
  }

}
