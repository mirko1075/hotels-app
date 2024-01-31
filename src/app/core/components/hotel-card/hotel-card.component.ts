import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hotel } from 'src/app/core/models/hotel.model';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;
  @Output() sendDeleteHotel: EventEmitter<number> = new EventEmitter<number>();

  deleteHotel(hotelId: number): void {
    this.sendDeleteHotel.emit(hotelId);
  }
}
