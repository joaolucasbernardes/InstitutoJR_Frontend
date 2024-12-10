import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { CommonModule } from '@angular/common'; // Importa o CommonModule para o uso de NgFor
import { register as registerSwiperElements } from 'swiper/element/bundle';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-carrousel-mini',
  standalone: true,
  imports: [CommonModule], // Inclui o CommonModule para habilitar o uso do *ngFor
  templateUrl: './carrousel-mini.component.html',
  styleUrls: ['./carrousel-mini.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarrouselMiniComponent {
  images: string[] = []; // Array para armazenar as URLs das imagens
  isLoading: boolean = true; 


  private apiUrl = `${environment.strapiBaseUrl}/sobre-o-projetos`;
  
  constructor() {}

  async getSobreOProjetoContent() {
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
      const response = await this.getSobreOProjetoContent();
  
      if (response && response.data && response.data.length > 0) {
        const data = response.data[0]; // Acessa o primeiro objeto da lista
        if (data.Image && data.Image.length > 0) { // Verifica se há imagens
            this.images = data.Image.map((img: any) => `${environment.apiEndpoint}${img.url}`);
        } else {
            console.error('Nenhuma imagem encontrada');
        }
      } else {
        console.error('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Strapi:', error);
    } finally {
      this.isLoading = false; // Oculta o skeleton após o carregamento
    }
  }
}

registerSwiperElements();
