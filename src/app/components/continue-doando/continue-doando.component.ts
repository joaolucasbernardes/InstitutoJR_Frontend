import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-continue-doando',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './continue-doando.component.html',
  styleUrls: ['./continue-doando.component.css']
})
export class ContinueDoandoComponent {
  paragrafo1: string = '';
  paragrafo2: string = '';
  image1: string = '';
  image2: string = '';

  isLoading: boolean = true;


  private apiUrl = `${environment.strapiBaseUrl}/continue-doandos`;

  constructor() {}

  async getContinueDoandoContent() {
    try {
      const response = await axios.get(`${this.apiUrl}?populate=*`);
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
      const response = await this.getContinueDoandoContent();

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0];
        this.paragrafo1 = data.Paragrafo1;
        this.paragrafo2 = data.Paragrafo2;

        if (data.Image && data.Image.url) {
          this.image1 = `${environment.apiEndpoint}${data.Image.url}`;
        } else {
          console.error('Nenhuma imagem 1 encontrada');
        }

        if (data.Image2 && data.Image2.url) {
          this.image2 = `${environment.apiEndpoint}${data.Image2.url}`;
        } else {
          console.error('Nenhuma imagem 2 encontrada');
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
