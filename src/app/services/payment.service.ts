// src\app\services\payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentData {
  billingType: 'BOLETO' | 'PIX' | 'CREDIT_CARD';
  dueDate: string; // Formato YYYY-MM-DD
  value: number;
  description?: string;
  externalReference?: string;
  redirectUrl?: string; // URL para redirecionamento após o pagamento
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:1337/api/payments'; // Endpoint do backend

  constructor(private http: HttpClient) {}

  createPayment(requestBody: { customerData: any; paymentData: any }): Observable<any> {
    return this.http.post<any>(this.apiUrl, requestBody);
  }
}
