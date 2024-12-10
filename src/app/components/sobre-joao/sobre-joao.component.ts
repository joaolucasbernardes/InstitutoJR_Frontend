import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-joao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-joao.component.html',
  styleUrls: ['./sobre-joao.component.css']
})
export class SobreJoaoComponent {
  title: string = '';
  textline1: string = '';
  textline2: string = '';
  image: string = '';
  isLoading: boolean = true; // Variável de controle para exibir o skeleton


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
    try {
      const response = await this.getSobreJoaoContent();

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
    } finally {
      this.isLoading = false; // Oculta o skeleton após o carregamento
    }
  }
}
