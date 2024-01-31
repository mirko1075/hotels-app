import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/core/services/hotels.service';
@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
})
export class EditHotelComponent implements OnInit {
  hotelId: number = -1;
  hotel: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));
    this.hotel = this.hotelService.getHotelById(this.hotelId);
  }

  saveChanges() {
    this.hotelService.updateHotel(this.hotel);
    this.cdr.detectChanges();
    this.router.navigate(['/hotels']);
  }
}
