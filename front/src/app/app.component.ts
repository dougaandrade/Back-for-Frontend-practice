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
  private queryParamsSubscription: Subscription | undefined;
  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];

  private readonly activatedRoute = inject(ActivatedRoute);

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

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }

  painelLoader(onlyInternet: boolean) {
    this.showingInternetPanels = onlyInternet;
  }
}
