import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../services/valor-doacao.service';

@Component({
  selector: 'app-coomprovante-de-doacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coomprovante-de-doacao.component.html',
  styleUrl: './coomprovante-de-doacao.component.css'
})
export class ComprovanteDeDoacaoComponent implements OnInit {
  inputValue: number = 0;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private sharedDataService: SharedDataService,

  ) {}

  ngOnInit(): void {
    this.sharedDataService.currentInputValue.subscribe((value) => (this.inputValue = value));

  }

  doarMais(): void {
    this.router.navigate(['/como-doar']); // Navega para a página de doação, ajuste conforme necessário
  }
}