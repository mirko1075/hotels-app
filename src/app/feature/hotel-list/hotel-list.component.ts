import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hotel } from 'src/app/core/models/hotel.model';
import { HotelService } from 'src/app/core/services/hotels.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels: Hotel[] = [];
  private subscription = new Subscription();
  constructor(private hotelService: HotelService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    });
  }

  deleteHotel(hotelId: number): void {
    if (typeof hotelId !== 'number' || hotelId < 1) return;

    this.subscription.add(
      this.hotelService
        .deleteHotel(hotelId)
        .subscribe((hotels) => (this.hotels = hotels))
    );
  }

  search(searchText: string): void {
    console.log('searchText :>> ', searchText);
    this.hotelService.getHotelByName(searchText).subscribe((hotels) => {
      if (hotels) this.hotels = hotels;
    });
  }
}
