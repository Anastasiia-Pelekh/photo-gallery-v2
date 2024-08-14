import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categories } from './data/categories.data';

@Component({
  selector: 'app-search-photo',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true
})
export class SearchBarComponent implements OnDestroy {
  @Output() onSearchTerm = new EventEmitter<string>();

  public searchForm: FormGroup;
  public selectedCategory: string = '';

  public readonly categories = Categories;

  private readonly subscription = new Subscription();

  constructor() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('')
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm');
    if (searchTerm?.value && searchTerm?.value.trim()) {
      this.onSearchTerm.emit(searchTerm.value);
      searchTerm.reset('');
    }
  }

  public onSelectCategory(selectElement: HTMLSelectElement): void {
    this.onSearchTerm.emit(this.selectedCategory);
    selectElement.blur();
  }
}
