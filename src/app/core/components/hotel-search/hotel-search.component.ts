import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HotelService } from '../../services/hotels.service';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-hotel-search',
  templateUrl: './hotel-search.component.html',
  styleUrls: ['./hotel-search.component.scss'],
})
export class HotelSearchComponent {
  searchText: string = '';
  @Output() sendText = new EventEmitter<string>();

  constructor(private hotelService: HotelService) {}

  searchHotels() {
    this.sendText.emit(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.searchHotels();
  }
}
