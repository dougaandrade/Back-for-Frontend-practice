import { Component, EventEmitter, inject, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'card-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<any[]>();
  private readonly dataService = inject(DataService);

  protected searchTerm: string = '';

  sabiaPaineis: any[] = [];
  filteredPaineis: any[] = [];

  ngOnInit(): void {
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
  }
}
