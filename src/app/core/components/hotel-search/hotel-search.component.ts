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
  searchForm!: FormGroup;

  @Output() searchTextChanged: EventEmitter<string> =
    new EventEmitter<string>();
  searchText = new FormControl('');
  subscription = new Subscription();
  errorMessage: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchText: [''],
    });
    const formControl = this.searchForm?.get('searchText');
    if (formControl)
      this.subscription = this.searchForm.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((query) => {
            console.log('query :>> ', query);
            this.searchTextChanged.emit(query);
            return query;
          })
        )
        .subscribe(
          (result) => {
            this.searchTextChanged.emit(result as string);
          },
          (error) => {
            this.errorMessage = error;
            console.log(this.errorMessage);
          },
          () => {
            console.log('onCompleted');
          }
        );
  }
  onSearchTextChanged(): void {
    if (this.searchText.value?.length)
      this.searchTextChanged.emit(this.searchText.value);
  }
}
