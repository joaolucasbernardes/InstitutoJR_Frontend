import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  linkFacebook: string = '';
  linkInstagram: string = '';

  private apiUrl = `${environment.strapiBaseUrl}/rede-socials`;

  constructor() {}

  async getRedeSocialContent() {
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
      const response = await this.getRedeSocialContent();

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0];

        this.linkFacebook = data?.FacebookLink || '#';
        this.linkInstagram = data?.InstagramLink || '#';
      } else {
        console.error('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Strapi:', error);
    }
  }
}
