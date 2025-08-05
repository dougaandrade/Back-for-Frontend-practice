import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardComponent } from './components/card-component/card-component';
import { ButtonComponent } from './components/button-component/button.component';
import { SearchComponent } from './components/search-component/search.component';

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
  title = 'my-angular-app';
  errorMessage: string = '';
  showingInternetPanels: boolean = false;
  private queryParamsSubscription: Subscription | undefined;
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const internetParam = params['internet'];
        this.showingInternetPanels = internetParam === 'true';
      }
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  PainelLoader(onlyInternet: boolean) {
    this.showingInternetPanels = onlyInternet;
  }
}
