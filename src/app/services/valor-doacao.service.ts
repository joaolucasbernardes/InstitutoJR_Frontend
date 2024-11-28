import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private inputValue: BehaviorSubject<number>;
  public currentInputValue;

  constructor() {
    // Carrega o valor inicial do localStorage ou usa 0 se não houver valor salvo
    const storedValue = localStorage.getItem('inputValue');
    const initialValue = storedValue !== null ? Number(storedValue) : 0;

    // Inicializa o BehaviorSubject com o valor correto
    this.inputValue = new BehaviorSubject<number>(initialValue);

    // Inicializa o observable após a inicialização de inputValue
    this.currentInputValue = this.inputValue.asObservable();
  }

  // Método para mudar o valor
  changeInputValue(value: number) {
    this.inputValue.next(value);
    // Salva o novo valor no localStorage
    localStorage.setItem('inputValue', value.toString());
  }
}
