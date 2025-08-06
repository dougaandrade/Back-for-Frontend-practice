import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'card-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  showAllPanels() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { internet: null },
      queryParamsHandling: 'merge',
    });
  }

  showInternetPanels() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { internet: true },
      queryParamsHandling: 'merge',
    });
  }
}
