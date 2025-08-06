import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardComponent } from './components/card-component/card-component';
import { ButtonComponent } from './components/button-component/button.component';
import { SearchComponent } from './components/search-component/search.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    ButtonComponent,
    SearchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
<<<<<<< Updated upstream
  errorMessage: string = '';
  showingInternetPanels: boolean = false;
=======
>>>>>>> Stashed changes
  private queryParamsSubscription: Subscription | undefined;
  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];

  private readonly activatedRoute = inject(ActivatedRoute);

  filteredPaineis: any[] = [];
  showingInternetPanels: boolean = false;

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const internetParam = params['internet'];
        this.showingInternetPanels = internetParam === 'true';
      }
    );
  }

  onSearchResult(paineis: any[]) {
    this.filteredPaineis = paineis;
  }

<<<<<<< Updated upstream
  onSearch(term: string) {
    const lowerTerm = term.toLowerCase();
    this.filteredPaineis = this.sabiaPaineis.filter((painel) =>
      painel.title?.toLowerCase().includes(lowerTerm)
    );
  }

  PainelLoader(onlyInternet: boolean) {
=======
  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }

  painelLoader(onlyInternet: boolean) {
>>>>>>> Stashed changes
    this.showingInternetPanels = onlyInternet;
  }
}
