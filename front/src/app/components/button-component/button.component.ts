import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
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
  showingInternetPanels: boolean = false;

  @Output() showAll = new EventEmitter<void>();
  @Output() showInternet = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<boolean>();

  showAllPanels() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { internet: undefined },
      queryParamsHandling: 'merge',
    });
    this.toggle.emit(false); // ← CORRETO: emite false!
    this.showAll.emit();
  }
  showInternetPanels() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { internet: true },
      queryParamsHandling: 'merge',
    });
    this.toggle.emit(true);
    this.showInternet.emit();
  }
}
