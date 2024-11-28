import { Component } from '@angular/core'; 
import { PaymentService } from '../../services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fisica-payment',
  standalone: true,
  imports: [FormsModule], // Importa FormsModule aqui
  templateUrl: './fisica-payment.component.html',
  styleUrls: ['./fisica-payment.component.css']
})

export class FisicaPaymentComponent {
  paymentData = {
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
    value: 0,
  };

  constructor(private paymentService: PaymentService) {}

  async submitPayment() {
    const customerData = {
      name: 'João Lucas',
      cpfCnpj: '12345678909',
      email: 'joaolucas@example.com',
      phone: '11999999999',
    };

    try {
      const response = await this.paymentService.createPayment(customerData, this.paymentData);
      console.log('Payment response:', response);
      alert('Pagamento realizado com sucesso!');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Erro ao realizar pagamento. Verifique os dados e tente novamente.');
    }
  }
}