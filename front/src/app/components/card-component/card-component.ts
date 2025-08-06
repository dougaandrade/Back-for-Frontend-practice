<<<<<<< Updated upstream
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
=======
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../../services/data.service';
import { debounceTime, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
>>>>>>> Stashed changes

@Component({
  selector: 'card-component',
  standalone: true,
<<<<<<< Updated upstream
  imports: [CommonModule, RouterModule, FormsModule],
=======
  imports: [CommonModule, FormsModule],
>>>>>>> Stashed changes
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent implements OnChanges {
<<<<<<< Updated upstream
  @Output() PanelsLoaded = new EventEmitter<boolean>();
  @Input() showinginternetpanels: boolean = false;
  @Output() search = new EventEmitter<string>();
=======
  @Output() panelsLoaded = new EventEmitter<boolean>();
  @Input() filteredPaineis: any[] = [];
>>>>>>> Stashed changes

  @Input() showinginternetpanels: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];

  searchTerm: string = '';

  private readonly $triggerTime = new Subject<boolean>();
  private readonly dataService = inject(DataService);

  constructor() {
<<<<<<< Updated upstream
    this.$triggerTime
      .pipe(debounceTime(400))
      .subscribe((onlyInternet) => this.loadPanels(onlyInternet));
=======
    this.$triggerTime.pipe(debounceTime(1000)).subscribe((onlyInternet) => {
      this.loadPanels(onlyInternet);
    });
>>>>>>> Stashed changes
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showinginternetpanels']) {
      this.loading = true;
      this.errorMessage = '';
      this.$triggerTime.next(this.showinginternetpanels);
    }
    if (changes['filteredPaineis']) {
      this.sabiaPaineis = changes['filteredPaineis'].currentValue || [];
    }
  }

  loadPanels(onlyInternet?: boolean) {
    this.errorMessage = '';

    this.dataService.getSabiaPaineis(onlyInternet).subscribe({
      next: (data) => {
        this.sabiaPaineis = data;
<<<<<<< Updated upstream
        this.filteredPaineis = data;
        this.PanelsLoaded.emit(!!onlyInternet);
=======
        this.panelsLoaded.emit(!!onlyInternet);
>>>>>>> Stashed changes
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
