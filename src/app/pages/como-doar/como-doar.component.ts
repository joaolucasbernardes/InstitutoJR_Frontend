import { Component } from '@angular/core';
import { SejaUmDoadorComponent } from '../../components/seja-um-doador/seja-um-doador.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { EscolherValorComponent } from '../../components/escolher-valor/escolher-valor.component';
import { RealizacoesComponent } from '../../components/realizacoes/realizacoes.component';
import { ContinueDoandoComponent } from '../../components/continue-doando/continue-doando.component';
import { TracadoBackgroundComponent } from '../../components/tracado-background/tracado-background.component';

@Component({
  selector: 'app-como-doar',
  standalone: true,
  imports: [
    SejaUmDoadorComponent, 
    CarouselComponent, 
    EscolherValorComponent, 
    RealizacoesComponent, 
    ContinueDoandoComponent, 
    TracadoBackgroundComponent
  ],
  templateUrl: './como-doar.component.html',
  styleUrl: './como-doar.component.css'
})
export class ComoDoarComponent {

}
