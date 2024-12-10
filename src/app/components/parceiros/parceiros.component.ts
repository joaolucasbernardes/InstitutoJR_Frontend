import { Component } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-parceiros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.css']
})
export class ParceirosComponent {
  images: string[] = []; // Array para armazenar URLs de imagens
  isLoading: boolean = true;

  private apiUrl = `${environment.strapiBaseUrl}/parceiros`;

  constructor() {}

  async getParceirosContent() {
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
      const response = await this.getParceirosContent();

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
    } finally {
      this.isLoading = false; 
    }
  }
}
