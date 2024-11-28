import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-continue-doando',
  standalone: true,
  imports: [],
  templateUrl: './continue-doando.component.html',
  styleUrl: './continue-doando.component.css'
})
export class ContinueDoandoComponent {
  paragrafo1: string = '';
  paragrafo2: string = '';
  image: string = '';

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
    console.log('Tentando carregar o conteúdo...');
    try {
      const response = await this.getContinueDoandoContent();
      console.log('Resposta do Strapi:', response); // Log da resposta para verificar os dados

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0];
        this.paragrafo1 = data.Paragrafo1;
        this.paragrafo2 = data.Paragrafo2;
        
        if (data.Image && data.Image.url) {
          this.image = `${environment.apiEndpoint}${data.Image.url}`;
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
