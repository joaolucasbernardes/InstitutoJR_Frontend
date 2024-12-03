import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TracadoBackgroundComponent } from '../../components/tracado-background/tracado-background.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SharedDataService } from '../../services/valor-doacao.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service'; // Serviço para lidar com pagamentos

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
  // Propriedades do formulário
  nome: string = '';
  email: string = '';
  telefone: string = '';
  cnpj: string = '';
  nomeFantasia: string = '';
  razaoSocial: string = '';
  inscricaoEstadual: string = '';
  cep: string = ''; // Campo adicionado para o CEP
  isentoInscricaoEstadual: boolean = false;

  // Propriedades relacionadas à doação
  inputValue: number = 0;
  valorDaDoacao: number = 0;
  totalDaDoacao: number = 0;
  incluirTaxas: boolean | null = null;

  // Propriedades de consentimento
  aceitoReceberInformacoes: boolean = false;
  aceitoPoliticaPrivacidade: boolean = false;

  // Propriedade para o método de pagamento
  metodoPagamento: string = 'BOLETO';

  constructor(
    private sharedDataService: SharedDataService,
    private currencyPipe: CurrencyPipe,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sharedDataService.currentInputValue.subscribe((value) => {
      this.inputValue = value || 0; // Define o valor como 0 se for indefinido
      this.calcularValores(); // Recalcula os valores
    });
  }
  

  ngAfterViewInit() {
    // Configuração do container de toasts
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
    if (this.incluirTaxas) {
      this.totalDaDoacao = (this.valorDaDoacao * 1.0299) + 0.49; // Aplica 2,99% e adiciona R$0,49
    } else {
      this.totalDaDoacao = this.valorDaDoacao; 
    }
  } 

  pagar() {
    // Validação do formulário antes de prosseguir com o pagamento
    if (!this.validarFormulario()) return;

    const customerData = {
      name: this.razaoSocial,
      email: this.email,
      cpfCnpj: this.cnpj.replace(/\D/g, ''), // Remove a máscara do CNPJ
      phone: this.telefone.replace(/\D/g, ''), // Remove a máscara do telefone
      postalCode: this.cep, // Inclui o CEP no payload
    };

    const paymentData = {
      billingType: this.metodoPagamento, // Método de pagamento selecionado
      dueDate: new Date().toISOString().split('T')[0], // Data de vencimento
      value: this.totalDaDoacao,
      description: 'Doação para o Instituto João Rodrigues',
    };

    const requestBody = { customerData, paymentData };

    this.paymentService.createPayment(requestBody).subscribe(
      (response) => {
        if (response.invoiceUrl) {
          window.location.href = response.invoiceUrl; // Redireciona para o link de pagamento
        } else {
          this.showToast('Erro ao gerar link de pagamento.', 'danger');
        }
      },
      (error) => {
        console.error('Erro ao gerar link de pagamento:', error);
        this.showToast('Erro ao gerar link de pagamento. Tente novamente.', 'danger');
      }
    );
  }

  validarFormulario(): boolean {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (
      !this.razaoSocial ||
      !this.nomeFantasia ||
      !this.email ||
      !this.telefone ||
      !this.cnpj ||
      !this.cep
    ) {
      this.showToast('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    // Verifica se a política de privacidade foi aceita
    if (!this.aceitoPoliticaPrivacidade) {
      this.showToast('Por favor, aceite a Política de Privacidade.');
      return false;
    }

    // Verifica se a escolha de taxas foi feita
    if (this.incluirTaxas === null) {
      this.showToast('Por favor, selecione uma opção para as taxas de transação.');
      return false;
    }

    return true;
  }

  formatCurrency(value: number): string {
    // Formata o valor como moeda brasileira (BRL)
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') ?? '';
  }

  showToast(message: string, type: string = 'danger') {
    // Exibe uma mensagem de notificação (toast)
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
