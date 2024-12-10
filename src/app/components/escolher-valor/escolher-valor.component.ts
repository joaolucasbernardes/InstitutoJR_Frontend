import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { ScrollToTopService } from '../../services/scroll-to-top.service';
import { SharedDataService } from '../../services/valor-doacao.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-escolher-valor',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './escolher-valor.component.html',
  styleUrls: ['./escolher-valor.component.css'],
  providers: [provideNgxMask()]
})
export class EscolherValorComponent implements OnInit {
  valor: number | null = null;
  inputValue: number | null = null;
  radioSelected: boolean = false;

  isLoading: boolean = true;


  text: string = '';
  conta: string = '';
  valor1: number | null = null;
  valor2: number | null = null;
  valor3: number | null = null;

  valorPorDia1: number | null = null;
  valorPorDia2: number | null = null;
  valorPorDia3: number | null = null;

  private apiUrl = `${environment.strapiBaseUrl}/escolher-valors`;

  constructor(
    private sharedDataService: SharedDataService,
    private scrollService: ScrollToTopService,
    private router: Router,
    private authGuard: AuthGuard
  ) {}


  async ngOnInit() {
    await this.loadContent();
    this.scrollService.initialize();
  }

  async getEscolherValorContent() {
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
      const response = await this.getEscolherValorContent();

      if (response && response.data && response.data.length > 0) {
        const data = response.data[0];
        this.text = data.Text;
        this.conta = data.Conta;
        this.valor1 = data.Valor1;
        this.valor2 = data.Valor2;
        this.valor3 = data.Valor3;

        if (this.valor1 !== null) {
          this.valorPorDia1 = this.valor1 / 30;
        }
        if (this.valor2 !== null) {
          this.valorPorDia2 = this.valor2 / 30;
        }
        if (this.valor3 !== null) {
          this.valorPorDia3 = this.valor3 / 30;
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


  
  onInputChange(event: any) {
    if (event.target && event.target.value !== '') {
      const rawValue = event.target.value.replace('R$ ', '').replace(',00', '').replace('.', '');
      this.inputValue = parseFloat(rawValue);
      this.sharedDataService.changeInputValue(this.inputValue);
      this.radioSelected = true;
    }
  }

  onRadioChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'custom') {
      this.valor = null;
      this.inputValue = null;
      this.radioSelected = true;
    } else {
      this.valor = parseFloat(selectedValue);
      this.inputValue = null;
      this.radioSelected = true;
    }
  }

  validarEscolha() {
    const valorFinal = this.valor !== null ? this.valor : this.inputValue;
  
    if (!this.radioSelected || valorFinal === null || valorFinal <= 0) {
      alert('Por favor, selecione um valor ou insira um valor válido.');
      return;
    }
  
    // Atualiza o valor no SharedDataService
    this.sharedDataService.changeInputValue(valorFinal);
  
    // Navega para o componente "Pessoa Física"
    this.authGuard.setAccessAllowed(true);
    this.router.navigate(['/pf']);
  }  
}