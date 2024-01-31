import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/core/models/hotel.model';
import { HotelService } from 'src/app/core/services/hotels.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotels = this.hotelService.getHotels();
  }

  deleteHotel(hotelId: number): void {
    if (typeof hotelId !== 'number' || hotelId < 1) return;

    this.hotelService.deleteHotel(hotelId);
  }
}
