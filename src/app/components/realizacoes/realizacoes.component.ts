import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-realizacoes',
  standalone: true,
  imports: [],
  templateUrl: './realizacoes.component.html',
  styleUrl: './realizacoes.component.css'
})
export class RealizacoesComponent {
  numeroAlunoBeneficiado: number | null = null;
  numeroEmpregos: number | null = null;
  numeroVoluntarios: number | null = null;

  private apiUrl = `${environment.strapiBaseUrl}/realizacaos`;

  async ngOnInit() {
    await this.loadContent();
  }

  async getRealizacoesContent() {
    try {
      const response = await axios.get(`${this.apiUrl}?populate=*`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar conteúdo do Strapi:', error);
      throw error;
    }
  }

  async loadContent() {
    console.log('Tentando carregar o conteúdo...');
    try {
      const response = await this.getRealizacoesContent();
      console.log('Resposta do Strapi:', response); // Log da resposta para verificar os dados

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0];
        this.numeroAlunoBeneficiado = data.AlunosBeneficiados;
        this.numeroEmpregos = data.Empregos;
        this.numeroVoluntarios = data.Voluntarios;


      } else {
        console.error('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Strapi:', error);
    }
  }

}
