import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-seja-um-doador',
  standalone: true,
  imports: [],
  templateUrl: './seja-um-doador.component.html',
  styleUrl: './seja-um-doador.component.css'
})
export class SejaUmDoadorComponent {
  title: string = '';
  text: string = '';
  image: string = '';

  private apiUrl = `${environment.strapiBaseUrl}/seja-um-doador-como-doars`;

  constructor() {}

  async getSejaDoadorContent() {
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
      const response = await this.getSejaDoadorContent();
      console.log('Resposta do Strapi:', response); // Log da resposta para verificar os dados

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0];
        this.title = data.Title;
        this.text = data.Text;
        
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
