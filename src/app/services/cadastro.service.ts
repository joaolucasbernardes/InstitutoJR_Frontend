import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  // URLs base para Pessoa Física e Jurídica, usando a variável de ambiente
  private pessoaFisicaUrl = `${environment.strapiBaseUrl}/pessoa-fisicas`;
  private pessoaJuridicaUrl = `${environment.strapiBaseUrl}/pessoa-juridicas`;

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
