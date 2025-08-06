<<<<<<< Updated upstream
import { Component, EventEmitter, Output } from '@angular/core';
=======
import { Component, EventEmitter, inject, Output } from '@angular/core';
>>>>>>> Stashed changes
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'card-search',
<<<<<<< Updated upstream
  imports: [CommonModule, FormsModule],
=======
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
>>>>>>> Stashed changes
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
<<<<<<< Updated upstream
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
=======
  @Output() search = new EventEmitter<any[]>();
  private readonly dataService = inject(DataService);

  protected searchTerm: string = '';

  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];

  constructor() {
    this.dataService.getSabiaPaineis().subscribe((data) => {
      this.sabiaPaineis = data;
      this.filteredPaineis = data;
    });
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredPaineis = this.sabiaPaineis;
    } else {
      this.filteredPaineis = this.sabiaPaineis.filter((painel) =>
        painel.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.search.emit(this.filteredPaineis);
>>>>>>> Stashed changes
  }
}
