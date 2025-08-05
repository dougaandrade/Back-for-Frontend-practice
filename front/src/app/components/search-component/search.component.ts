import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'card-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm);
  }
}
