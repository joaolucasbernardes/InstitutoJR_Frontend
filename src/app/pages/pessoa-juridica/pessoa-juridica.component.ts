import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TracadoBackgroundComponent } from '../../components/tracado-background/tracado-background.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SharedDataService } from '../../services/valor-doacao.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { CadastroService } from '../../services/cadastro.service'; // Importa o serviço de cadastro

declare var bootstrap: any;

@Component({
  selector: 'app-pessoa-juridica',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TracadoBackgroundComponent,
    CarouselComponent,
    CommonModule,
    NgxMaskDirective,
  ],
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.css'],
  providers: [provideNgxMask(), CurrencyPipe],
})

export class PessoaJuridicaComponent implements OnInit, AfterViewInit {
  nome: string = '';
  email: string = '';
  telefone: string = '';
  cnpj: string = '';
  nomeFantasia: string = '';
  razaoSocial: string = '';
  inscricaoEstadual: string = '';

  inputValue: number = 0;
  valorDaDoacao: number = 0;
  totalDaDoacao: number = 0;
  incluirTaxas: boolean | null = null;

  aceitoReceberInformacoes: boolean = false;
  aceitoPoliticaPrivacidade: boolean = false;
  isentoInscricaoEstadual: boolean = false;

  constructor(
    private sharedDataService: SharedDataService,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private cadastroService: CadastroService // Adiciona o serviço de cadastro
  ) {}

  ngOnInit() {
    this.sharedDataService.currentInputValue.subscribe((value) => {
      this.inputValue = value;
      this.calcularValores(); // Calcula os valores de acordo com o valor atualizado
    });
  }

  ngAfterViewInit() {
    const toastContainer = document.getElementById('toastContainer');
    if (toastContainer) {
      toastContainer.addEventListener('hidden.bs.toast', function (event) {
        if (event.target) {
          toastContainer.removeChild(event.target as HTMLElement);
        }
      });
    }
  }

  calcularValores() {
    this.valorDaDoacao = this.inputValue;
    if (this.incluirTaxas === true) {
      this.totalDaDoacao = this.valorDaDoacao * 1.0099; // 0.99% de taxa
    } else {
      this.totalDaDoacao = this.valorDaDoacao;
    }
  }

  continuar() {
    if (!this.nome || !this.email || !this.cnpj || !this.telefone || !this.nomeFantasia || !this.razaoSocial) {
      this.showToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (this.incluirTaxas === null) {
      this.showToast('Por favor, selecione uma opção para as taxas de transação.');
      return;
    }

    if (!this.aceitoPoliticaPrivacidade) {
      this.showToast('Por favor, marque a caixa dos termos de políticas de privacidade, se concordar.');
      return;
    }

    const cadastro = {
      Nome: this.nome,
      Email: this.email,
      Telefone: this.telefone,
      Cnpj: this.cnpj,
      NomeFantasia: this.nomeFantasia,
      RazaoSocial: this.razaoSocial,
      InscricaoEstadual: this.inscricaoEstadual,
      ValorDaDoacao: this.valorDaDoacao, 
      TotalDaDoacao: this.totalDaDoacao, 
      IncluirTaxas: this.incluirTaxas, 
      AceitaReceberInformacoes: this.aceitoReceberInformacoes,
      AceitaPoliticaPrivacidade: this.aceitoPoliticaPrivacidade,
      IsentoInscricaoEstadual: this.isentoInscricaoEstadual
    };

    this.cadastroService.createCadastroPessoaJuridica(cadastro).subscribe(
      (response) => {
        this.showToast('Cadastro realizado com sucesso!', 'success');
        setTimeout(() => {
          this.router.navigate(['/comprovante']);
        }, 3000);
      },
      (error) => {
        this.showToast('Erro ao realizar o cadastro.', 'danger');
      }
    );
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') ?? '';
  }

  showToast(message: string, type: string = 'danger') {
    const toastContainer = document.getElementById('toastContainer');

    if (toastContainer) {
      const toastElement = document.createElement('div');
      toastElement.className = `toast align-items-center text-bg-${type} border-0`;
      toastElement.role = 'alert';
      toastElement.ariaLive = 'assertive';
      toastElement.ariaAtomic = 'true';

      toastElement.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;

      toastContainer.appendChild(toastElement);

      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
