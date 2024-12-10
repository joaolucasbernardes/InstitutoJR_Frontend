import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TracadoBackgroundComponent } from '../../components/tracado-background/tracado-background.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { SharedDataService } from '../../services/valor-doacao.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';

declare var bootstrap: any;

@Component({
  selector: 'app-pessoa-fisica',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TracadoBackgroundComponent,
    CarouselComponent,
    CommonModule,
    NgxMaskDirective,
  ],
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.css'],
  providers: [provideNgxMask(), CurrencyPipe],
})
export class PessoaFisicaComponent implements OnInit, AfterViewInit {
  nome: string = '';
  email: string = '';
  cpf: string = '';
  telefone: string = '';
  inputValue: number = 0;
  valorDaDoacao: number = 0;
  totalDaDoacao: number = 0;
  incluirTaxas: boolean | null = null;
  metodoPagamento: 'BOLETO' | 'PIX' | 'CREDIT_CARD' = 'CREDIT_CARD';
  aceitoReceberInformacoes: boolean = false;
  aceitoPoliticaPrivacidade: boolean = false;
  cep: string = '';


  constructor(
    private sharedDataService: SharedDataService,
    private currencyPipe: CurrencyPipe,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.sharedDataService.currentInputValue.subscribe((value) => {
      this.inputValue = value || 0; // Define o valor como 0 se for indefinido
      this.calcularValores(); // Recalcula os valores
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
    if (this.incluirTaxas) {
      this.totalDaDoacao = (this.valorDaDoacao * 1.0299) + 0.49; // Aplica 2,99% e adiciona R$0,49
    } else {
      this.totalDaDoacao = this.valorDaDoacao; 
    }
  }  

  pagar() {
    if (!this.validarFormulario()) return;

    const customerData = {
      name: this.nome,
      email: this.email,
      cpfCnpj: this.cpf.replace(/\D/g, ''), // Remove a máscara do CPF/CNPJ
      mobilePhone: this.telefone.replace(/\D/g, ''), // Remove a máscara do telefone
      postalCode: this.cep,
    };

    // Validação local de CPF antes de enviar para o backend
    if (!this.validarCpf(customerData.cpfCnpj)) {
      this.showToast('CPF inválido. Certifique-se de preencher corretamente.', 'danger');
      return;
    }

    const paymentData = {
      billingType: this.metodoPagamento,
      dueDate: new Date().toISOString().split('T')[0],
      value: this.totalDaDoacao,
      description: 'Doação para o Instituto João Rodrigues',
    };

    const requestBody = { customerData, paymentData };

    localStorage.removeItem('accessAllowed');
    localStorage.removeItem('inputValue'); 

    this.paymentService.createPayment(requestBody).subscribe(
      (response) => {
        if (response.invoiceUrl) {
          window.location.href = response.invoiceUrl;
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

  validarCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  }

  validarFormulario(): boolean {
    if (!this.nome || !this.email || !this.cpf || !this.telefone || !this.cep) {
      this.showToast('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (!this.validarCpf(this.cpf)) {
      this.showToast('CPF inválido. Verifique e tente novamente.');
      return false;
    }

    if (this.incluirTaxas === null) {
      this.showToast('Por favor, selecione uma opção para as taxas de transação.');
      return false;
    }

    if (!this.aceitoPoliticaPrivacidade) {
      this.showToast('Por favor, marque a caixa dos termos de políticas de privacidade, se concordar.');
      return false;
    }

    return true;
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
