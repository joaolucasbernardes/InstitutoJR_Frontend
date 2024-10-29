// Importa os módulos necessários do Angular
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery'

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',  
  standalone: true, 
  styleUrls: ['./pagamento.component.css'], 
  imports: [],  
})

export class PagamentoComponent implements OnInit {
  checkoutId: string = '';
  integrity: string = 'sha384-A81TfeXJfXfhJxR1W4Au2xuPEp+z/N/Ivmu160oHWOfpUn0J+ORwr5sOmQYeQmqb';
  shopperResultUrl: string = '/comprovante';
  wpwlOptions: any = {
    style: "card",
    onReady: () => { /* Sua lógica personalizada */ },
    onChangeBrand: (e: string) => { /* Sua lógica personalizada */ }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.prepareCheckout();
  }

  prepareCheckout(): void {
    this.http.post('http://localhost:1337/api/prepare-checkout', { /* dados */ }).subscribe((response: any) => {
      this.checkoutId = response.id;
    });
  }
}
