import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sabia';
  sabiaPaineis: any[] = []; 
  errorMessage: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRecords().subscribe({
      next: (data) => {
        this.sabiaPaineis = data;
      },
      error: (error) => {
        console.error('Erro ao buscar registros do PocketBase:', error);
        this.errorMessage = 'Não foi possível carregar os painéis. Verifique se o BFF está rodando e conectado ao PocketBase.';
      }
    });
  }
}