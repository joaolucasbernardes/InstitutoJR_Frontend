import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realizacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realizacoes.component.html',
  styleUrl: './realizacoes.component.css'
})
export class RealizacoesComponent {
  numeroAlunoBeneficiado: number | null = null;
  numeroEmpregos: number | null = null;
  numeroVoluntarios: number | null = null;

  isLoading: boolean = true;


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
    try {
      const response = await this.getRealizacoesContent();

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
    } finally {
      this.isLoading = false; 
    }
  }

}
