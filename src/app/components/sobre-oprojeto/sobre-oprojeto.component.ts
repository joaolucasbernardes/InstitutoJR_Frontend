import { Component } from '@angular/core';
import { CarrouselMiniComponent } from '../carrousel-mini/carrousel-mini.component';
import axios from 'axios';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-sobre-oprojeto',
  standalone: true,
  imports: [CarrouselMiniComponent],
  templateUrl: './sobre-oprojeto.component.html',
  styleUrl: './sobre-oprojeto.component.css'
})
export class SobreOProjetoComponent {
  title: string = '';
  text1: string = '';
  text2: string = '';
  text3: string = '';

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
    console.log('Tentando carregar o conteúdo...');
    try {
      const response = await this.getSobreOProjetoContent();
      console.log('Resposta do Strapi:', response); // Log da resposta
  
      if (response && response.data && response.data.length > 0) {
        const data = response.data[0]; // Acessa o primeiro objeto da lista
        this.title = data.Title; 
        this.text1 = data.Text1; 
        this.text2 = data.Text2; 
        this.text3 = data.Text3; 
      } else {
        console.error('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Strapi:', error);
    }
}
}
