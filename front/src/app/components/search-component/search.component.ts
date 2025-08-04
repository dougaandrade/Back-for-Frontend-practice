import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'card-search',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchQuery: string = '';

  async onSearch() {
    if (
      this.searchQuery.trim() === '' ||
      this.searchQuery.trim().length === 0
    ) {
      // Handle empty search query if needed
      return;
    }
  }
}
