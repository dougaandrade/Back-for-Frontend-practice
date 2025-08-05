import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { debounceTime, Subject } from 'rxjs';
import {
  inject,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  Component,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'card-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent implements OnChanges {
  @Output() PanelsLoaded = new EventEmitter<boolean>();
  @Input() showinginternetpanels: boolean = false;
  @Output() search = new EventEmitter<string>();

  loading: boolean = false;
  errorMessage: string = '';
  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];

  searchTerm: string = '';

  private readonly $triggerTime = new Subject<boolean>();
  private readonly dataService = inject(DataService);

  constructor() {
    this.$triggerTime
      .pipe(debounceTime(400))
      .subscribe((onlyInternet) => this.loadPanels(onlyInternet));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showinginternetpanels']) {
      this.loading = true;
      this.errorMessage = '';
      this.$triggerTime.next(this.showinginternetpanels);
    }
  }

  loadPanels(onlyInternet?: boolean) {
    this.errorMessage = '';
    this.sabiaPaineis = [];

    this.dataService.getSabiaPaineis(onlyInternet).subscribe({
      next: (data) => {
        this.sabiaPaineis = data;
        this.filteredPaineis = data;
        this.PanelsLoaded.emit(!!onlyInternet);
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Não foi possível carregar os painéis. Verifique a conexão do BFF com o PocketBase.';
        this.loading = false;
      },
    });
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPaineis = this.sabiaPaineis.filter((painel) =>
      painel.title?.toLowerCase().includes(term)
    );
  }
}
