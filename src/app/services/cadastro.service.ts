import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  // URL base para o Strapi
  private pessoaFisicaUrl = 'http://localhost:1337/api/pessoa-fisicas';
  private pessoaJuridicaUrl = 'http://localhost:1337/api/pessoa-juridicas';

  constructor(private http: HttpClient) {}

  // Cadastro de Pessoa Física
  createCadastroPessoaFisica(cadastro: any): Observable<any> {
    return this.http.post(this.pessoaFisicaUrl, { data: cadastro });
  }

  // Cadastro de Pessoa Jurídica
  createCadastroPessoaJuridica(cadastro: any): Observable<any> {
    return this.http.post(this.pessoaJuridicaUrl, { data: cadastro });
  }
}
