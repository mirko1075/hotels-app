import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss'],
})
export class HotelSearchComponent {
  searchText: string = '';
  @Output() sendText = new EventEmitter<string>();

  searchHotels() {
    this.sendText.emit(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.searchHotels();
  }
}
