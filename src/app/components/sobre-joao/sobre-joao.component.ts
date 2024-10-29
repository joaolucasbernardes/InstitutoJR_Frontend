import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sobre-joao',
  standalone: true,
  imports: [],
  templateUrl: './sobre-joao.component.html',
  styleUrls: ['./sobre-joao.component.css']
})
export class SobreJoaoComponent {
  title: string = '';
  textline1: string = '';
  textline2: string = '';
  image: string = '';

  private apiUrl = `${environment.strapiBaseUrl}/sobre-o-joaos`;

  constructor() {}

  async getSobreJoaoContent() {
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
      const response = await this.getSobreJoaoContent();
      console.log('Resposta do Strapi:', response); // Log da resposta para verificar os dados

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0];

        // Atualiza os campos de texto
        this.title = data.Title || '';
        this.textline1 = data.TextLine1 || '';
        this.textline2 = data.TextLine2 || '';
        
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
