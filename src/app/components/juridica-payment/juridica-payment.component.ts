import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-juridica-payment',
  standalone: true,
  imports: [],
  templateUrl: './juridica-payment.component.html',
  styleUrl: './juridica-payment.component.css'
})
export class JuridicaPaymentComponent {

  customerData = {
    // Dados específicos do cliente
  };
  paymentData = {
    // Dados específicos do pagamento
  };

  constructor(private paymentService: PaymentService) {}

  submitPayment() {
    this.paymentService.createPayment(this.customerData, this.paymentData).then(response => {
      console.log('Payment created:', response.data);
    }).catch(error => {
      console.error('Error creating payment:', error);
    });
  }
}


