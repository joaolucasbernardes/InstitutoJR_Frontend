import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import axios from 'axios';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-seja-doador',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './seja-doador.component.html',
  styleUrl: './seja-doador.component.css'
})
export class SejaDoadorComponent {

  title: string = '';
  content: string = '';
  image: string = '';

  private apiUrl = `${environment.strapiBaseUrl}/seja-um-doador-homes`;

  constructor() {}

  async getSejaUmDoadorHomeContent() {
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
      const response = await this.getSejaUmDoadorHomeContent();
      console.log('Resposta do Strapi:', response); // Log da resposta
  
      if (response && response.data && response.data.length > 0) {
        const data = response.data[0]; // Acessa o primeiro objeto da lista
        this.title = data.Title; // Acessando a propriedade Title
        this.content = data.Content; // Acessando a propriedade Content
        if (data.Image && data.Image.length > 0) { // Verifica se há imagens
          this.image = `${environment.apiEndpoint}${data.Image[0].url}`; // Acessa a URL da primeira imagem
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
