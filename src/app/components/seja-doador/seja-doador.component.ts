import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import axios from 'axios';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-seja-doador',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './seja-doador.component.html',
  styleUrl: './seja-doador.component.css'
})
export class SejaDoadorComponent {
  isLoading: boolean = true;
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
    try {
      const response = await this.getSejaUmDoadorHomeContent();
  
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
    }  finally {
      this.isLoading = false; // Oculta o skeleton após o carregamento
    }
}

}
