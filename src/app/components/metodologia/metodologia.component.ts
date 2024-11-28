import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-metodologia',
  standalone: true,
  imports: [],
  templateUrl: './metodologia.component.html',
  styleUrl: './metodologia.component.css'
})
export class MetodologiaComponent {

  title: string = '';
  textline1: string = '';
  titlecard1: string = '';
  textcard1: string = '';
  titlecard2: string = '';
  textcard2: string = '';
  titlecard3: string = '';
  textcard3: string = '';
  textrodape1: string = '';
  textrodape2: string = '';

  private apiUrl = `${environment.strapiBaseUrl}/metodologias`;

  constructor() {}

  async getMetodologiaContent() {
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
      const response = await this.getMetodologiaContent();
      console.log('Resposta do Strapi:', response); // Log da resposta
  
      if (response && response.data && response.data.length > 0) {
        const data = response.data[0]; 
        this.title = data.Title; 
        this.textline1 = data.Textline1;
        this.titlecard1 = data.TitleCard1;
        this.textcard1 = data.TextCard1;
        this.titlecard2 = data.TitleCard2;
        this.textcard2 = data.TextCard2;
        this.titlecard3 = data.TitleCard3;
        this.textcard3 = data.TextCard3;
        this.textrodape1 = data.TextRodape1;
        this.textrodape2 = data.TextRodape2;
      } else {
        console.error('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Strapi:', error);
    }
}
}
