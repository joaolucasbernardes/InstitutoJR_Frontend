import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private accessAllowedKey = 'accessAllowed'; // Chave para armazenar no localStorage

  constructor(private router: Router) {
    const accessAllowed = localStorage.getItem(this.accessAllowedKey);
    this.accessAllowed = accessAllowed === 'true';

    // Verifica se o usuário está voltando para a página inicial
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/') {
        // Limpa o localStorage ao voltar para a página inicial
        localStorage.removeItem(this.accessAllowedKey);
        this.accessAllowed = false; // Reseta o estado accessAllowed localmente
      }
    });
  }

  private accessAllowed: boolean = false;

  setAccessAllowed(value: boolean): void {
    this.accessAllowed = value;
    localStorage.setItem(this.accessAllowedKey, value.toString()); // Salva no localStorage
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.accessAllowed) {
      return true; // Permite a navegação se accessAllowed for true
    } else {
      this.router.navigate(['/']); // Redireciona para a página inicial se accessAllowed for false
      return false;
    }
  }
}
