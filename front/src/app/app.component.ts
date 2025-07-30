import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-angular-app';
  sabiaPaineis: any[] = [];
  errorMessage: string = '';
  showingInternetPanels: boolean = false;
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      const internetParam = params['internet'];
      this.showingInternetPanels = internetParam === 'true'; 
      this.loadPanels(this.showingInternetPanels ? true : undefined); 
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  loadPanels(onlyInternet?: boolean) {
    this.errorMessage = '';
    this.sabiaPaineis = [];

    this.dataService.getSabiaPaineis(onlyInternet).subscribe({
      next: (data) => {
        this.sabiaPaineis = data;
      },
      error: (err) => {
        console.error('Erro ao carregar painéis:', err);
        this.errorMessage = 'Não foi possível carregar os painéis. Verifique a conexão do BFF com o PocketBase.';
      }
    });
  }

  showAllPanels() {

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { internet: null },
      queryParamsHandling: 'merge'
    });
  }

  showInternetPanels() {

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { internet: true },
      queryParamsHandling: 'merge'
    });
  }
}