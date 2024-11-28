import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-o-instituto',
  standalone: true,
  imports: [],
  templateUrl: './o-instituto.component.html',
  styleUrl: './o-instituto.component.css'
})
export class OInstitutoComponent {
  title: string = '';
  content: string = '';
  image: string = '';

  private apiUrl = `${environment.strapiBaseUrl}/o-institutos`;

  constructor() {}

  async getOInstitutoContent() {
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
      const response = await this.getOInstitutoContent();
      console.log('Resposta do Strapi:', response); // Log da resposta
  
      if (response && response.data && response.data.length > 0) {
        const data = response.data[0]; // Acessa o primeiro objeto da lista
        this.title = data.Title; // Acessando a propriedade Title
        this.content = data.Content; // Acessando a propriedade Content
        if (data.Image && data.Image.length > 0) { 
          this.image = `${environment.apiEndpoint}${data.Image[0].url}`; 
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