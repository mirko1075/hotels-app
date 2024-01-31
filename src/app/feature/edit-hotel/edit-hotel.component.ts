import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel, HotelImpl } from 'src/app/core/models/hotel.model';
import { HotelService } from 'src/app/core/services/hotels.service';
@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
})
export class EditHotelComponent implements OnInit {
  hotelId: number = -1;
  hotel!: Hotel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.hotelId) this.hotel = this.hotelService.getHotelById(this.hotelId);
    else this.hotel = new HotelImpl(-1, '', '', 0, 0, 0);
  }

  saveChanges() {
    if (this.hotelId && this.hotelId > 0)
      this.hotelService.updateHotel(this.hotel);
    else this.hotelService.addHotel(this.hotel);
    this.cdr.detectChanges();
    this.router.navigate(['/hotels']);
  }
}
