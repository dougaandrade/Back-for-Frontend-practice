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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'card-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './card-component.html',
  styleUrls: ['./card-component.css'],
})
export class CardComponent implements OnChanges {
  @Output() panelsLoaded = new EventEmitter<boolean>();
  @Input() filteredPaineis: any[] = [];
  @Input() showinginternetpanels: boolean = false;

  loading: boolean = false;
  errorMessage: string = '';
  sabiaPaineis: any[] = [];
  searchTerm: string = '';

  private readonly $triggerTime = new Subject<boolean>();
  private readonly dataService = inject(DataService);

  constructor() {
    this.$triggerTime.pipe(debounceTime(400)).subscribe((onlyInternet) => {
      this.loadPanels(onlyInternet);
    });
    this.loadPanels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showinginternetpanels']) {
      this.loading = true;
      this.$triggerTime.next(this.showinginternetpanels);
    }

    if (changes['filteredPaineis']) {
      this.sabiaPaineis = changes['filteredPaineis'].currentValue || [];
    }
  }

  loadPanels(onlyInternet?: boolean) {
    this.errorMessage = '';
    this.loading = true;

    this.dataService.getSabiaPaineis(onlyInternet).subscribe({
      next: (data) => {
        this.sabiaPaineis = data;
        this.panelsLoaded.emit(!!onlyInternet);
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Não foi possível carregar os painéis. Verifique a conexão do BFF com o PocketBase.';
        this.loading = false;
      },
    });
  }
}
