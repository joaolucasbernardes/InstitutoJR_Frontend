import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComoDoarComponent } from './pages/como-doar/como-doar.component';
import { PessoaJuridicaComponent } from './pages/pessoa-juridica/pessoa-juridica.component';
import { PessoaFisicaComponent } from './pages/pessoa-fisica/pessoa-fisica.component';
import { AuthGuard } from './guards/auth.guard';
import { ComprovanteDeDoacaoComponent } from './pages/comprovante-de-doacao/coomprovante-de-doacao.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'como-doar', component: ComoDoarComponent, data: { scrollPositionRestoration: 'enabled' } },
    { path: 'pf', component: PessoaFisicaComponent, canActivate: [AuthGuard] },
    { path: 'pj', component: PessoaJuridicaComponent, canActivate: [AuthGuard] },
    { path: 'comprovante', component: ComprovanteDeDoacaoComponent, canActivate: [AuthGuard] },

  ];
