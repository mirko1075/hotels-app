import { Component, Input } from '@angular/core';
import { Hotel } from 'src/app/core/models/hotel.model';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent {
  @Input() hotel!: Hotel;
}
