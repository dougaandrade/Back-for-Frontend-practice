import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnChanges,
  output,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'card-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent implements OnChanges {
  protected readonly PanelsLoaded = output<boolean>();
  @Input() showinginternetpanels: boolean = false;

  loading: boolean = false;
  errorMessage: string = '';
  sabiaPaineis: any[] = [];

  private readonly $triggerTime = new Subject<boolean>();
  private readonly dataService = inject(DataService);

  constructor() {
    this.$triggerTime.pipe(debounceTime(1000)).subscribe((onlyInternet) => {
      this.loadPanels(onlyInternet);
    });
    this.loadPanels();
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
}
